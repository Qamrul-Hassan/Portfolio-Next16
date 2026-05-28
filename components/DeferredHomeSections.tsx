"use client";

import React, { useEffect, useRef, useState } from "react";

type LoadedComponent = React.ComponentType<Record<string, never>>;

type DeferredSectionProps = {
  id: string;
  minHeight: string;
  loader: () => Promise<{ default: LoadedComponent }>;
};

function DeferredSection({ id, minHeight, loader }: DeferredSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [Component, setComponent] = useState<LoadedComponent | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || Component) return;

    let cancelled = false;
    const load = () => {
      loader().then((mod) => {
        if (!cancelled) setComponent(() => mod.default);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [Component, loader]);

  if (Component) return <Component />;

  return (
    <section
      ref={ref}
      id={id}
      aria-hidden="true"
      style={{ minHeight, background: "var(--bg)" }}
    />
  );
}

function DeferredChat() {
  const [Component, setComponent] = useState<LoadedComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("./Chat").then((mod) => {
        if (!cancelled) setComponent(() => mod.default);
      });
    };
    const scheduleIdle =
      window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 1800));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const id = scheduleIdle(load, { timeout: 3000 });

    return () => {
      cancelled = true;
      cancelIdle(id);
    };
  }, []);

  return Component ? <Component /> : null;
}

export default function DeferredHomeSections() {
  return (
    <>
      <DeferredSection id="about" minHeight="760px" loader={() => import("./AboutMe")} />
      <DeferredSection id="services" minHeight="980px" loader={() => import("./Services")} />
      <DeferredSection id="projects" minHeight="1120px" loader={() => import("./MyProjects")} />
      <DeferredSection id="contact" minHeight="780px" loader={() => import("./Contact")} />
    </>
  );
}

export function DeferredFooterAndChat() {
  return (
    <>
      <DeferredSection id="footer" minHeight="520px" loader={() => import("./Footer")} />
      <DeferredChat />
    </>
  );
}
