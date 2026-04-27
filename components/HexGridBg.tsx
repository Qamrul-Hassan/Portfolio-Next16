"use client";
import React, { useRef, useEffect } from "react";

/**
 * HexGridBg — flat-top hexagonal grid with vivid animated flashes.
 *
 * Flash alpha is intentionally visible (0.5–0.6 range) so sections
 * feel alive. The grid lines stay dim so they don't overpower content.
 */
type Props = {
  r?: number; g?: number; b?: number;       // grid line + dot colour
  r2?: number; g2?: number; b2?: number;    // flash fill colour
  hexSize?: number;
  maxFlashes?: number;
  frameSkip?: number;
};

const HexGridBg: React.FC<Props> = ({
  r = 14,  g = 165, b = 233,
  r2 = 20, g2 = 184, b2 = 166,
  hexSize = 30,
  maxFlashes = 12,
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

    const getSkip = () => {
      const w = window.innerWidth;
      if (w < 640)  return Math.max(frameSkip, 3);
      if (w < 1024) return Math.max(frameSkip, 2);
      return frameSkip;
    };
    let skip = getSkip();

    const R  = hexSize;
    const CS = R * 1.5;
    const RS = Math.sqrt(3) * R;

    const drawHex = (cx: number, cy: number, rad: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        i === 0
          ? ctx.moveTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a))
          : ctx.lineTo(cx + rad * Math.cos(a), cy + rad * Math.sin(a));
      }
      ctx.closePath();
    };

    type Cell = { cx: number; cy: number };
    let cells: Cell[] = [];

    const rebuildGrid = () => {
      cells = [];
      const cols = Math.ceil(W / CS) + 3;
      const rows = Math.ceil(H / RS) + 3;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          cells.push({
            cx: col * CS,
            cy: row * RS + (col % 2 !== 0 ? RS / 2 : 0),
          });
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

    // Two flash colours — primary (teal) and accent (fuchsia/violet)
    // This gives each section visual depth without changing its bg colour
    const FLASH_COLORS: [number,number,number][] = [
      [r2, g2, b2],          // teal
      [168, 85, 247],        // violet-500
      [56,  189, 248],       // sky-400
    ];

    type Flash = { idx: number; life: number; maxLife: number; color: [number,number,number] };
    const flashes: Flash[] = [];
    let flashTimer = 0;

    const spawnFlash = () => {
      if (!cells.length) return;
      const color = FLASH_COLORS[Math.floor(Math.random() * FLASH_COLORS.length)];
      flashes.push({
        idx: Math.floor(Math.random() * cells.length),
        life: 0,
        maxLife: 65,
        color,
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
      scanY = (scanY + 1.0) % H;
      flashTimer++;
      if (flashTimer > 22 * skip) { flashTimer = 0; spawnFlash(); }

      // 1 — hex outlines — visible but not heavy
      ctx.strokeStyle = `rgba(${r},${g},${b},0.10)`;
      ctx.lineWidth = 0.8;
      cells.forEach(({ cx, cy }) => {
        drawHex(cx, cy, R - 1.5);
        ctx.stroke();
      });

      // 2 — scan-line dot pulse on centres
      cells.forEach(({ cx, cy }) => {
        const dist = Math.abs(cy - scanY);
        const glow = Math.max(0, 1 - dist / 90);
        if (glow < 0.02) return;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.07 + glow * 0.28})`;
        ctx.fill();
      });

      // 3 — vivid flash hexes (the main visual feature)
      flashes.forEach((f) => {
        f.life++;
        // Alpha peaks at 0.55 — bright and visible
        const alpha = Math.sin((f.life / f.maxLife) * Math.PI) * 0.55;
        if (alpha <= 0.005) return;
        const cell = cells[f.idx];
        if (!cell) return;
        const { cx, cy } = cell;
        const [fr, fg, fb] = f.color;

        // Hex fill with radial glow
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
        grad.addColorStop(0, `rgba(${fr},${fg},${fb},${alpha})`);
        grad.addColorStop(1, `rgba(${fr},${fg},${fb},0)`);
        drawHex(cx, cy, R - 1.5);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright hex border
        drawHex(cx, cy, R - 1.5);
        ctx.strokeStyle = `rgba(${fr},${fg},${fb},${alpha * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glowing centre dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fr},${fg},${fb},${Math.min(1, alpha * 1.8)})`;
        ctx.shadowColor = `rgba(${fr},${fg},${fb},0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4 — scan sweep
      const sg = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      sg.addColorStop(0,   `rgba(${r},${g},${b},0)`);
      sg.addColorStop(0.5, `rgba(${r},${g},${b},0.06)`);
      sg.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 50, W, 100);

      ctx.beginPath();
      ctx.moveTo(0, scanY); ctx.lineTo(W, scanY);
      ctx.strokeStyle = `rgba(${r},${g},${b},0.12)`;
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
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
};

export default HexGridBg;
