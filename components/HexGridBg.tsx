"use client";
import React, { useRef, useEffect } from "react";

/**
 * HexGridBg — flat-top hexagonal grid background.
 *
 * Flat-top tiling (like a honeycomb lying flat):
 *   hex width  = 2R
 *   hex height = √3·R
 *   col step   = 1.5R   (cols overlap by 0.5R on their sides)
 *   row step   = √3·R
 *   odd cols offset down by √3·R / 2
 *
 * This produces the classic "honeycomb" look that actually tiles correctly.
 */

type Props = {
  r?: number; g?: number; b?: number;
  r2?: number; g2?: number; b2?: number;
  hexSize?: number;   // circumradius R (default 28)
  maxFlashes?: number;
  frameSkip?: number;
};

const HexGridBg: React.FC<Props> = ({
  r = 14, g = 165, b = 233,
  r2 = 20, g2 = 184, b2 = 166,
  hexSize = 28,
  maxFlashes = 14,
  frameSkip = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    // Adaptive frame-skip for mobile performance
    const getSkip = () => {
      const w = window.innerWidth;
      if (w < 640)  return Math.max(frameSkip, 3);
      if (w < 1024) return Math.max(frameSkip, 2);
      return frameSkip;
    };
    let skip = getSkip();

    // ── Flat-top hex geometry ─────────────────────────────────────────
    const R   = hexSize;
    const HW  = R * 2;            // hex full width (tip to tip horizontally)
    const HH  = Math.sqrt(3) * R; // hex full height (flat side to flat side)
    const CS  = R * 1.5;          // column step (horizontal distance between centres)
    const RS  = HH;               // row step (vertical distance between centres)

    /** Draw a flat-top hexagon centred at (cx,cy) with radius rad */
    const drawHex = (cx: number, cy: number, rad: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        // Flat-top: first vertex at 0° (right), step 60°
        const a = (Math.PI / 3) * i;
        i === 0
          ? ctx.moveTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a))
          : ctx.lineTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a));
      }
      ctx.closePath();
    };

    // Build list of hex centres covering the canvas
    type Cell = { cx: number; cy: number };
    let cells: Cell[] = [];

    const rebuildGrid = () => {
      cells = [];
      const cols = Math.ceil(W / CS) + 3;
      const rows = Math.ceil(H / RS) + 3;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * CS;
          // Odd columns shift down by half a row
          const cy = row * RS + (col % 2 !== 0 ? RS / 2 : 0);
          cells.push({ cx, cy });
        }
      }
    };
    rebuildGrid();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      skip = getSkip();
      rebuildGrid();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Flash state ───────────────────────────────────────────────────
    type Flash = { idx: number; life: number; maxLife: number };
    const flashes: Flash[] = [];
    let flashTimer = 0;

    const spawnFlash = () => {
      if (!cells.length) return;
      flashes.push({
        idx: Math.floor(Math.random() * cells.length),
        life: 0,
        maxLife: 60,
      });
      if (flashes.length > maxFlashes) flashes.shift();
    };

    let scanY = 0;
    let frameCount = 0;
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frameCount++;
      if (frameCount % skip !== 0) return;

      ctx.clearRect(0, 0, W, H);
      scanY = (scanY + 1.2) % H;
      flashTimer++;
      if (flashTimer > 30 * skip) { flashTimer = 0; spawnFlash(); }

      // 1 — static hex outlines
      ctx.strokeStyle = `rgba(${r},${g},${b},0.09)`;
      ctx.lineWidth = 0.8;
      cells.forEach(({ cx, cy }) => {
        drawHex(cx, cy, R - 1);
        ctx.stroke();
      });

      // 2 — scan-line dot glow on centres
      cells.forEach(({ cx, cy }) => {
        const dist = Math.abs(cy - scanY);
        const glow = Math.max(0, 1 - dist / 100);
        if (glow < 0.01) return;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.08 + glow * 0.32})`;
        ctx.fill();
      });

      // 3 — glowing flash hexes
      flashes.forEach((f) => {
        f.life++;
        const alpha = Math.sin((f.life / f.maxLife) * Math.PI) * 0.55;
        if (alpha <= 0.01) return;
        const cell = cells[f.idx];
        if (!cell) return;
        const { cx, cy } = cell;

        // Hex fill glow
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
        grad.addColorStop(0, `rgba(${r2},${g2},${b2},${alpha})`);
        grad.addColorStop(1, `rgba(${r2},${g2},${b2},0)`);
        drawHex(cx, cy, R - 1);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright border
        drawHex(cx, cy, R - 1);
        ctx.strokeStyle = `rgba(${r2},${g2},${b2},${alpha * 0.85})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Bright centre dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 1.8)})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4 — horizontal scan sweep
      const sg = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      sg.addColorStop(0,   `rgba(${r},${g},${b},0)`);
      sg.addColorStop(0.5, `rgba(${r},${g},${b},0.065)`);
      sg.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 50, W, 100);

      ctx.beginPath();
      ctx.moveTo(0, scanY); ctx.lineTo(W, scanY);
      ctx.strokeStyle = `rgba(${r},${g},${b},0.13)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [r, g, b, r2, g2, b2, hexSize, maxFlashes, frameSkip]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default HexGridBg;
