"use client";

import React, { useEffect, useRef } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

const SectionBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip entirely on touchscreen devices — this background is a subtle
    // detail invisible at low opacity, not worth the main-thread cost on mobile.
    if (isTouchDevice()) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initHexes();
    };
    window.addEventListener("resize", onResize);

    const HEX_SIZE = 36;
    const HEX_W = HEX_SIZE * 2;
    const HEX_H = Math.sqrt(3) * HEX_SIZE;

    type HexState = { col: number; row: number; glow: number; target: number; timer: number };
    const hexStates: HexState[] = [];

    type WaveLine = { yFrac: number; amplitude: number; freq: number; speed: number; phase: number; color: string };
    const waves: WaveLine[] = [
      { yFrac: 0.30, amplitude: 18, freq: 0.012, speed:  0.018, phase: 0,   color: "rgba(14,165,233,0.09)" },
      { yFrac: 0.55, amplitude: 14, freq: 0.018, speed: -0.014, phase: 1.5, color: "rgba(20,184,166,0.07)" },
      { yFrac: 0.75, amplitude: 22, freq: 0.009, speed:  0.011, phase: 3.1, color: "rgba(56,189,248,0.06)" },
    ];

    const drawHex = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const initHexes = () => {
      hexStates.length = 0;
      const cols = Math.ceil(W / (HEX_W * 0.75)) + 2;
      const rows = Math.ceil(H / HEX_H) + 2;
      for (let i = 0; i < 8; i++) {
        hexStates.push({
          col: Math.floor(Math.random() * cols),
          row: Math.floor(Math.random() * rows),
          glow: 0,
          target: Math.random() * 0.35 + 0.1,
          timer: Math.floor(Math.random() * 80),
        });
      }
    };
    initHexes();

    let raf: number;
    let lastTime = 0;
    const FRAME_MS = 1000 / 30; // cap at 30fps — this is a background canvas

    const draw = (timestamp: number) => {
      // BUG FIX: rAF call is at the TOP only — the previous version called it
      // at both top and bottom, running the loop twice per frame.
      raf = requestAnimationFrame(draw);

      if (timestamp - lastTime < FRAME_MS) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);

      hexStates.forEach(h => {
        h.timer--;
        if (h.timer <= 0) {
          h.glow += (h.target - h.glow) * 0.08;
          if (Math.abs(h.glow - h.target) < 0.01) {
            h.target = h.target > 0.1 ? 0 : Math.random() * 0.35 + 0.1;
            h.timer = Math.floor(Math.random() * 60 + 20);
            if (Math.random() < 0.2) {
              const cols = Math.ceil(W / (HEX_W * 0.75)) + 2;
              const rows = Math.ceil(H / HEX_H) + 2;
              h.col = Math.floor(Math.random() * cols);
              h.row = Math.floor(Math.random() * rows);
            }
          }
        }
      });

      const cols = Math.ceil(W / (HEX_W * 0.75)) + 2;
      const rows = Math.ceil(H / HEX_H) + 2;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * HEX_W * 0.75;
          const cy = row * HEX_H + (col % 2 === 0 ? 0 : HEX_H / 2);
          const glowHex = hexStates.find(h => h.col === col && h.row === row);
          const baseAlpha = 0.04;
          const alpha = glowHex ? baseAlpha + glowHex.glow : baseAlpha;
          drawHex(cx, cy, HEX_SIZE - 2, alpha);

          if (glowHex && glowHex.glow > 0.05) {
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, HEX_SIZE);
            g.addColorStop(0, `rgba(14,165,233,${glowHex.glow * 0.3})`);
            g.addColorStop(1, "rgba(14,165,233,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i - Math.PI / 6;
              const x = cx + (HEX_SIZE - 2) * Math.cos(angle);
              const y = cy + (HEX_SIZE - 2) * Math.sin(angle);
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      waves.forEach(wave => {
        wave.phase += wave.speed;
        const waveY = wave.yFrac * H;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = waveY + Math.sin(x * wave.freq + wave.phase) * wave.amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
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
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default SectionBg;
