"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BRAND_RGB = {
  terracotta: [168, 92, 50] as const,
  olive: [138, 106, 46] as const,
  gold: [201, 161, 91] as const,
};
const PALETTE = [BRAND_RGB.terracotta, BRAND_RGB.olive, BRAND_RGB.gold];

const CYCLE_MS = 13000;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: readonly [number, number, number];
  column: number;
  seed: number;
};

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function cyclicWeight(t: number, center: number, width: number) {
  let d = Math.abs(t - center);
  d = Math.min(d, 1 - d);
  return smoothstep(width, 0, d);
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    const wrapMaybe = wrapRef.current;
    if (!canvasMaybe || !wrapMaybe) return;
    const ctxMaybe = canvasMaybe.getContext("2d");
    if (!ctxMaybe) return;

    if (reducedMotion) return;

    const canvas: HTMLCanvasElement = canvasMaybe;
    const wrap: HTMLDivElement = wrapMaybe;
    const ctx: CanvasRenderingContext2D = ctxMaybe;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const mouse = { x: -9999, y: -9999, active: false };

    function buildParticles() {
      const isMobile = width < 700;
      const density = isMobile ? 22000 : 15000;
      const count = Math.max(
        18,
        Math.min(isMobile ? 32 : 76, Math.floor((width * height) / density))
      );
      particles = Array.from({ length: count }, (_, i) => {
        const color = PALETTE[i % PALETTE.length];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          r: 1.1 + Math.random() * 1.6,
          color,
          column: i % 3,
          seed: Math.random() * 1000,
        };
      });
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onPointerLeave() {
      mouse.active = false;
    }

    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      const elapsed = now - start;
      const t = (elapsed % CYCLE_MS) / CYCLE_MS;

      const wSignal = cyclicWeight(t, 0.0, 0.22);
      const wGrowth = cyclicWeight(t, 0.36, 0.24);
      const wAscend = cyclicWeight(t, 0.74, 0.22);
      const wSum = wSignal + wGrowth + wAscend || 1;
      const s = wSignal / wSum;
      const g = wGrowth / wSum;
      const a = wAscend / wSum;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;

      // Signal pulse rings (creation beat)
      if (s > 0.05) {
        const ringCount = 3;
        for (let i = 0; i < ringCount; i++) {
          const local = ((elapsed / 1800 + i / ringCount) % 1);
          const radius = Math.max(0, local * Math.min(width, height) * 0.32);
          const alpha = (1 - local) * s * 0.35;
          if (alpha <= 0.003) continue;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${BRAND_RGB.gold.join(",")},${alpha})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      // Growth trend line
      if (g > 0.05) {
        const points: [number, number][] = [
          [width * 0.08, height * 0.72],
          [width * 0.28, height * 0.6],
          [width * 0.46, height * 0.63],
          [width * 0.64, height * 0.4],
          [width * 0.82, height * 0.46],
          [width * 0.96, height * 0.22],
        ];
        ctx.save();
        ctx.globalAlpha = g;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          const [px, py] = points[i];
          const [prevX, prevY] = points[i - 1];
          const midX = (px + prevX) / 2;
          const midY = (py + prevY) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(${BRAND_RGB.terracotta.join(",")},0.9)`);
        gradient.addColorStop(0.55, `rgba(${BRAND_RGB.olive.join(",")},0.9)`);
        gradient.addColorStop(1, `rgba(${BRAND_RGB.gold.join(",")},0.95)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(${BRAND_RGB.gold.join(",")},0.6)`;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // ticking abstract metric marks climbing the line
        const tickCount = 5;
        for (let i = 0; i < tickCount; i++) {
          const local = (elapsed / 2200 + i / tickCount) % 1;
          const idx = local * (points.length - 1);
          const i0 = Math.floor(idx);
          const frac = idx - i0;
          const p0 = points[Math.min(i0, points.length - 1)];
          const p1 = points[Math.min(i0 + 1, points.length - 1)];
          const tx = p0[0] + (p1[0] - p0[0]) * frac;
          const ty = p0[1] + (p1[1] - p0[1]) * frac - 10;
          ctx.globalAlpha = g * (1 - local) * 0.8;
          ctx.fillStyle = `rgba(${BRAND_RGB.gold.join(",")},1)`;
          ctx.fillRect(tx - 6, ty, 12, 2);
        }
        ctx.restore();
      }

      // Ascend pillars (recognition beat, echoing the mark)
      if (a > 0.04) {
        const pillWidth = Math.max(10, width * 0.016);
        const gap = pillWidth * 1.4;
        const baseY = height * 0.82;
        const maxHeight = height * 0.34;
        const colors = [BRAND_RGB.terracotta, BRAND_RGB.olive, BRAND_RGB.gold];
        const startX = cx - gap - pillWidth * 1.5;
        for (let i = 0; i < 3; i++) {
          const localA = cyclicWeight(t, 0.74 + i * 0.035, 0.2);
          const h = maxHeight * (0.25 + 0.75 * localA);
          const x = startX + i * (pillWidth + gap);
          const y = baseY - h;
          ctx.save();
          ctx.globalAlpha = Math.min(1, localA * 1.3);
          ctx.fillStyle = `rgb(${colors[i].join(",")})`;
          ctx.shadowColor = `rgba(${colors[i].join(",")},0.85)`;
          ctx.shadowBlur = 22 * localA;
          const radius = Math.max(0.5, pillWidth / 2);
          ctx.beginPath();
          ctx.moveTo(x, y + radius);
          ctx.arc(x + radius, y + radius, radius, Math.PI, 0);
          ctx.lineTo(x + pillWidth, baseY - radius);
          ctx.arc(x + radius, baseY - radius, radius, 0, Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      // Particle network
      const connDist = Math.min(width, height) * 0.12;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const angle = p.seed + elapsed * 0.00006;
        let ax = Math.cos(angle) * 0.02;
        let ay = Math.sin(angle) * 0.02;

        // signal: pull toward center, gentle orbit
        const dxs = cx - p.x;
        const dys = cy - p.y;
        ax += dxs * 0.0006 * s;
        ay += dys * 0.0006 * s;
        ax += -dys * 0.0004 * s;
        ay += dxs * 0.0004 * s;

        // growth: bias up and to the right, spread along diagonal band
        ax += 0.012 * g;
        ay += -0.02 * g;

        // ascend: pull toward assigned column base
        const colX = width * (0.5 - 0.14 + p.column * 0.14);
        const colY = height * (0.86 - 0.3 * a);
        ax += (colX - p.x) * 0.0009 * a;
        ay += (colY - p.y) * 0.0009 * a;

        // cursor reactivity
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist2 = mdx * mdx + mdy * mdy;
          const radius = 140;
          if (dist2 < radius * radius) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / radius) * 0.9;
            ax += (mdx / dist) * force;
            ay += (mdy / dist) * force;
          }
        }

        p.vx = (p.vx + ax) * 0.94;
        p.vy = (p.vy + ay) * 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      const netAlpha = 0.16 + 0.22 * (s + a);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connDist) {
            const alpha = (1 - d / connDist) * netAlpha;
            ctx.strokeStyle = `rgba(${BRAND_RGB.gold.join(",")},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(",")},0.9)`;
        ctx.shadowColor = `rgba(${p.color.join(",")},0.55)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    function onVisibility() {
      visible = document.visibilityState === "visible" && visible;
    }
    document.addEventListener("visibilitychange", onVisibility);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(201,161,91,0.16), transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(168,92,50,0.14), transparent 70%)",
          }}
        />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      )}
    </div>
  );
}
