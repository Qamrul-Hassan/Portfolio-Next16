"use client";

import { useEffect, useState } from "react";

type PdfJsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => {
    promise: Promise<{
      numPages: number;
      getPage: (page: number) => Promise<{
        getViewport: (args: { scale: number }) => { width: number; height: number };
        render: (args: {
          canvasContext: CanvasRenderingContext2D;
          viewport: { width: number; height: number };
        }) => {
          promise: Promise<void>;
        };
      }>;
    }>;
  };
};

declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[data-pdfjs="true"]') as HTMLScriptElement | null;
    if (existing && window.pdfjsLib) {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load PDF engine.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    script.async = true;
    script.dataset.pdfjs = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PDF engine."));
    document.body.appendChild(script);
  });

  if (!window.pdfjsLib) {
    throw new Error("PDF engine unavailable.");
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  return window.pdfjsLib;
}

type Props = {
  token: string;
};

export default function CvViewerClient({ token }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const renderPdfAsImages = async () => {
      if (!token) {
        setError("Missing secure token. Request a new resume link.");
        setLoading(false);
        return;
      }

      try {
        const pdfjs = await loadPdfJs();
        const response = await fetch(`/api/cv/data?token=${encodeURIComponent(token)}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || "Could not load resume.");
        }

        const data = (await response.json()) as { data?: string; error?: string };
        if (!data.data) {
          throw new Error(data.error || "Could not load resume.");
        }

        const binary = atob(data.data);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) {
          bytes[i] = binary.charCodeAt(i);
        }

        const loadingTask = pdfjs.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;

        const renderedPages: string[] = [];
        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
          const page = await pdf.getPage(pageNo);
          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Could not render resume page.");

          await page.render({ canvasContext: ctx, viewport }).promise;
          renderedPages.push(canvas.toDataURL("image/png"));
        }

        if (!mounted) return;
        setPages(renderedPages);
        setError("");
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Unable to load resume.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    renderPdfAsImages();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <main className="min-h-screen bg-[#0f0f14] px-3 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-center text-lg font-semibold text-white sm:text-xl">
          Secure Resume Viewer
        </h1>

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white">
            Loading resume...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-200">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="space-y-4" onContextMenu={(e) => e.preventDefault()}>
            {pages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-white/10 bg-black/25">
                <img
                  src={src}
                  alt={`Resume page ${index + 1}`}
                  className="block w-full select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
