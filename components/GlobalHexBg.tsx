"use client";

import React, { useEffect, useRef } from "react";

// Detects if the device is low-powered (mobile/tablet) so we can throttle
// the animation. This avoids the "Minimize main-thread work" Lighthouse flag.
function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  // navigator.hardwareConcurrency <= 4 is a reliable mobile proxy
  return (navigator.hardwareConcurrency ?? 8) <= 4;
}

const GlobalHexBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowPower = isLowPowerDevice();

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildHexes();
    };
    window.addEventListener("resize", onResize);

    const R = lowPower ? 40 : 30; // Fewer hexes on mobile = fewer draw calls
    const HH = Math.sqrt(3) * R;
    const CW = R * 1.5;
    // Spawn less frequently on low-power devices
    const SPAWN_INTERVAL = lowPower ? 35 : 20;

    const COLS_LEFT: [number, number, number][] = [
      [56,  189, 248],
      [14,  165, 233],
      [34,  211, 238],
      [6,   182, 212],
      [20,  184, 166],
    ];
    const COLS_RIGHT: [number, number, number][] = [
      [244, 114, 182],
      [236,  72, 153],
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
    // On low-power: cap at ~30fps to halve main-thread animation work
    const TARGET_FPS = lowPower ? 30 : 60;
    const FRAME_MS = 1000 / TARGET_FPS;

    const draw = (timestamp: number) => {
      raf = requestAnimationFrame(draw);

      // Throttle frame rate on mobile
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
        // Only draw the grid stroke for non-idle hexes or every hex at low opacity
        // Skip grid stroke on low-power to save draw calls
        if (!lowPower) {
          drawHex(h.cx, h.cy, R - 1);
          ctx.strokeStyle = "rgba(56,189,248,0.08)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

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

        // Skip inner hex ring on low-power (saves 1/3 of draw calls)
        if (!lowPower) {
          drawHex(h.cx, h.cy, (R - 1) * h.scale * 0.55);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(h.alpha * 0.6).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
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
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
};

export default GlobalHexBg;
