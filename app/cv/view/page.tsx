import { Suspense } from "react";
import CvViewerClient from "./viewer-client";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-[#0f0f14] px-3 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-center text-lg font-semibold text-white sm:text-xl">
          Secure Resume Viewer
        </h1>
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white">
          Loading resume...
        </div>
      </div>
    </main>
  );
}

export default async function CvViewPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <Suspense fallback={<LoadingFallback />}>
      <CvViewerClient token={token} />
    </Suspense>
  );
}
