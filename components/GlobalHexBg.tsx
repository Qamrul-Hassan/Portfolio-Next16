"use client";

import React, { useEffect, useRef } from "react";

// pointer:coarse is the gold-standard mobile signal — catches ALL touchscreen
// devices regardless of core count (hardwareConcurrency misses many mid-range phones)
function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

const GlobalHexBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip the entire canvas on mobile — saves the biggest chunk of main-thread work
    if (isTouchDevice()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildHexes();
    };
    window.addEventListener("resize", onResize);

    const R = 30;
    const HH = Math.sqrt(3) * R;
    const CW = R * 1.5;
    const SPAWN_INTERVAL = 20;

    const COLS_LEFT: [number, number, number][] = [
      [56, 189, 248],
      [14, 165, 233],
      [34, 211, 238],
      [6, 182, 212],
      [20, 184, 166],
    ];
    const COLS_RIGHT: [number, number, number][] = [
      [244, 114, 182],
      [236, 72, 153],
      [251, 113, 133],
      [249, 168, 212],
      [253, 164, 175],
    ];

    type Hex = {
      cx: number; cy: number;
      scale: number; alpha: number;
      phase: "idle" | "grow" | "hold" | "fade";
      t: number; holdMax: number;
      color: [number, number, number];
    };

    const hexes: Hex[] = [];
    let spawnT = 0;

    const buildHexes = () => {
      hexes.length = 0;
      const cols = Math.ceil(W / CW) + 2;
      const rows = Math.ceil(H / HH) + 2;
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          hexes.push({
            cx: c * CW,
            cy: r * HH + (c % 2 === 0 ? 0 : HH / 2),
            scale: 1, alpha: 0, phase: "idle", t: 0, holdMax: 40,
            color: COLS_LEFT[0],
          });
        }
      }
    };
    buildHexes();

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i === 0
          ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
          : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    };

    let raf: number;
    let lastTime = 0;
    // FIX: Reduce from 60fps to 20fps — the animation is subtle enough that
    // 20fps is imperceptible while cutting GPU/CPU cost by ~66%.
    const FRAME_MS = 1000 / 20;

    const draw = (timestamp: number) => {
      // Single rAF call at the TOP — this is the only loop driver
      raf = requestAnimationFrame(draw);

      if (timestamp - lastTime < FRAME_MS) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);
      spawnT++;

      if (spawnT >= SPAWN_INTERVAL) {
        spawnT = 0;
        const idle = hexes.filter((h) => h.phase === "idle");
        if (idle.length) {
          const h = idle[Math.floor(Math.random() * idle.length)];
          h.phase = "grow";
          h.scale = 0;
          h.alpha = 0;
          h.t = 0;
          h.holdMax = Math.floor(Math.random() * 50 + 25);
          const isRightSide = h.cx >= W * 0.5;
          const palette = isRightSide ? COLS_RIGHT : COLS_LEFT;
          h.color = palette[Math.floor(Math.random() * palette.length)];
        }
      }

      hexes.forEach((h) => {
        drawHex(h.cx, h.cy, R - 1);
        ctx.strokeStyle = "rgba(56,189,248,0.08)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (h.phase === "idle") return;
        h.t++;

        if (h.phase === "grow") {
          h.scale += (1 - h.scale) * 0.15;
          h.alpha += (0.7 - h.alpha) * 0.15;
          if (h.scale > 0.96) { h.phase = "hold"; h.t = 0; }
        } else if (h.phase === "hold") {
          if (h.t > h.holdMax) { h.phase = "fade"; h.t = 0; }
        } else {
          h.alpha -= 0.020;
          h.scale += (1.12 - h.scale) * 0.06;
          if (h.alpha <= 0) {
            h.phase = "idle"; h.alpha = 0; h.scale = 1; return;
          }
        }

        const [r, g, b] = h.color;

        drawHex(h.cx, h.cy, (R - 1) * h.scale);
        ctx.fillStyle = `rgba(${r},${g},${b},${(h.alpha * 0.55).toFixed(3)})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(${r},${g},${b},${h.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        drawHex(h.cx, h.cy, (R - 1) * h.scale * 0.55);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(h.alpha * 0.6).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
};

export default GlobalHexBg;
