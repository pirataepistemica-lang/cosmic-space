// SVG-based LuaView converted from the original canvas implementation
"use client";

import { useEffect, useRef } from "react";

type MoonPhase = "new" | "full";

type Moon = {
  id: number;
  type: "moon";
  phase: MoonPhase;
  x: number;
  y: number;
  radius: number;
  color: string;
  floatPhase: number;
};

export function LuaView() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const starsRef = useRef<SVGCircleElement[]>([]);
  const moonsRef = useRef<SVGCircleElement[]>([]);
  const trailRef = useRef<SVGPathElement | null>(null);
  const focusedLayerRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const WIDTH = 1000; // logical SVG width
    const HEIGHT = 1000;

    // Helpers (normalized 0..1)
    function toPxX(nx: number) {
      return nx * WIDTH;
    }

    function toPxY(ny: number) {
      return ny * HEIGHT;
    }

    function normRadius(nr: number) {
      return nr * Math.min(WIDTH, HEIGHT);
    }

    // Camera
    const camera = {
      current: { x: 0.5, y: 0.5, scale: 1 },
      target: { x: 0.5, y: 0.5, scale: 1 },
      lerp: 0.08,
    } as any;

    function updateCamera() {
      const c = camera.current;
      const t = camera.target;
      c.x += (t.x - c.x) * camera.lerp;
      c.y += (t.y - c.y) * camera.lerp;
      c.scale += (t.scale - c.scale) * camera.lerp;
    }

    // Stars
    type Star = { x: number; y: number; r: number; baseA: number; speed: number; phase: number };
    const stars: Star[] = [];
    const STAR_COUNT = 200;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.2, baseA: Math.random() * 0.6 + 0.2, speed: Math.random() * 2 + 0.5, phase: Math.random() * Math.PI * 2 });
    }

    // Nebulas
    const nebulas = [
      { x: 0.15, y: 0.25, r: 0.18, c1: "#82b4ff66", c2: "#14285000" },
      { x: 0.65, y: 0.15, r: 0.22, c1: "#ff96c866", c2: "#3c142800" },
      { x: 0.85, y: 0.65, r: 0.2, c1: "#aaffc866", c2: "#143c2800" },
    ];

    // Trail
    const trail = { amplitude: 0.08, frequency: 3.5, phaseSpeed: 0.0004 };
    function getTrailPoint(t: number, time: number) {
      const baseX = t;
      const baseY = 1 - t;
      const phase = time * trail.phaseSpeed;
      const offset = trail.amplitude * Math.sin(trail.frequency * t * Math.PI * 2 + phase);
      return { x: baseX, y: baseY + offset };
    }

    // Moons
    const moons: Moon[] = [
      { id: 1, type: "moon", phase: "new", x: 0.18, y: 0.65, radius: 0.022, color: "#333744", floatPhase: Math.random() * Math.PI * 2 },
      { id: 2, type: "moon", phase: "new", x: 0.32, y: 0.52, radius: 0.02, color: "#2c3140", floatPhase: Math.random() * Math.PI * 2 },
      { id: 3, type: "moon", phase: "new", x: 0.55, y: 0.32, radius: 0.024, color: "#3b3f4f", floatPhase: Math.random() * Math.PI * 2 },
      { id: 4, type: "moon", phase: "new", x: 0.78, y: 0.12, radius: 0.02, color: "#262a35", floatPhase: Math.random() * Math.PI * 2 },
      { id: 5, type: "moon", phase: "full", x: 0.22, y: 0.86, radius: 0.025, color: "#f5e3a0", floatPhase: Math.random() * Math.PI * 2 },
      { id: 6, type: "moon", phase: "full", x: 0.4, y: 0.7, radius: 0.02, color: "#ffd7a3", floatPhase: Math.random() * Math.PI * 2 },
      { id: 7, type: "moon", phase: "full", x: 0.62, y: 0.55, radius: 0.023, color: "#ffecc4", floatPhase: Math.random() * Math.PI * 2 },
      { id: 8, type: "moon", phase: "full", x: 0.82, y: 0.42, radius: 0.021, color: "#d7f0ff", floatPhase: Math.random() * Math.PI * 2 },
    ];

    let focusedMoonId: number | null = null;

    // Create SVG elements references arrays if not set
    starsRef.current = starsRef.current.slice(0, STAR_COUNT);
    moonsRef.current = moonsRef.current.slice(0, moons.length);

    // Animation loop
    let raf = 0;
    const start = performance.now();

    function render(now: number) {
      const time = now;
      updateCamera();

      // Update stars twinkle
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const el = starsRef.current[i];
        if (!el) continue;
        const tw = Math.sin(time * s.speed + s.phase) * 0.3 + 0.7;
        el.setAttribute("opacity", String(s.baseA * tw));
      }

      // Update trail path
      const segments = 220;
      const pts: string[] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const p = getTrailPoint(t, time);
        pts.push(`${toPxX(p.x)},${toPxY(p.y)}`);
      }
      if (trailRef.current) {
        trailRef.current.setAttribute("d", `M ${pts.join(" L ")}`);
      }

      // Update moons positions
      for (let i = 0; i < moons.length; i++) {
        const m = moons[i];
        const floatOffset = Math.sin(time * 0.0007 + m.floatPhase) * 0.008;
        const px = toPxX(m.x);
        const py = toPxY(m.y + floatOffset);
        const r = normRadius(m.radius);
        const el = moonsRef.current[i];
        if (!el) continue;
        el.setAttribute("cx", String(px));
        el.setAttribute("cy", String(py));
        el.setAttribute("r", String(r));
      }

      // Camera transform on main world group
      const world = svg.querySelector('#world') as SVGGElement | null;
      if (world) {
        const c = camera.current;
        const cx = toPxX(c.x);
        const cy = toPxY(c.y);
        const s = c.scale;
        // center, scale, then translate to camera center
        const tx = WIDTH / 2;
        const ty = HEIGHT / 2;
        world.setAttribute('transform', `translate(${tx} ${ty}) scale(${s}) translate(${-cx} ${-cy})`);
      }

      // Focused overlay
      if (focusedMoonId !== null && focusedLayerRef.current) {
        const moon = moons.find(m => m.id === focusedMoonId)!;
        const floatOffset = Math.sin(time * 0.0007 + moon.floatPhase) * 0.008;
        const worldPxX = toPxX(moon.x);
        const worldPxY = toPxY(moon.y + floatOffset);
        const c = camera.current;
        const sx = (worldPxX - toPxX(c.x)) * c.scale + WIDTH / 2;
        const sy = (worldPxY - toPxY(c.y)) * c.scale + HEIGHT / 2;
        const r = normRadius(moon.radius) * c.scale;

        const g = focusedLayerRef.current;
        // set circle in focused layer
        const focusedCircle = g.querySelector('circle.focused') as SVGCircleElement | null;
        if (focusedCircle) {
          focusedCircle.setAttribute('cx', String(sx));
          focusedCircle.setAttribute('cy', String(sy));
          focusedCircle.setAttribute('r', String(r));
        }
        const halo = g.querySelector('circle.halo') as SVGCircleElement | null;
        if (halo) halo.setAttribute('r', String(r * 3));
      }

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    // Interaction helpers
    function svgPointFromEvent(e: MouseEvent) {
      const rect = svg.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      // convert to svg coordinates inside WIDTH x HEIGHT
      const px = (sx / rect.width) * WIDTH;
      const py = (sy / rect.height) * HEIGHT;
      // convert to normalized world coordinates considering camera
      const c = camera.current;
      const worldX = (px - WIDTH / 2) / c.scale + toPxX(c.x);
      const worldY = (py - HEIGHT / 2) / c.scale + toPxY(c.y);
      return { px: worldX, py: worldY, nx: worldX / WIDTH, ny: worldY / HEIGHT };
    }

    function findClickedMoon(e: MouseEvent) {
      const p = svgPointFromEvent(e);
      for (const m of moons) {
        const dx = p.nx - m.x;
        const dy = p.ny - m.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist <= m.radius * 1.4) return m;
      }
      return null;
    }

    function focusOnMoon(m: Moon) {
      focusedMoonId = m.id;
      camera.target.x = m.x;
      camera.target.y = m.y;
      camera.target.scale = 2.5;
    }

    function resetCamera() {
      focusedMoonId = null;
      camera.target.x = 0.5;
      camera.target.y = 0.5;
      camera.target.scale = 1;
    }

    const handleClick = (ev: MouseEvent) => {
      const clicked = findClickedMoon(ev);
      if (clicked) {
        if (focusedMoonId === clicked.id) resetCamera();
        else focusOnMoon(clicked);
      }
    };

    const handleKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') resetCamera(); };

    svg.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Render static SVG structure; dynamic parts updated via refs
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <svg ref={svgRef} viewBox="0 0 1000 1000" className="fixed inset-0 w-screen h-screen block">
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(100,160,255,0)" />
            <stop offset="20%" stopColor="rgba(160,210,255,0.8)" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="rgba(160,220,255,0.8)" />
            <stop offset="100%" stopColor="rgba(100,160,255,0)" />
          </linearGradient>
          <filter id="blurHalo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {/* background */}
        <rect x="0" y="0" width="1000" height="1000" fill="#02030a" />

        {/* stars */}
        {Array.from({ length: 200 }).map((_, i) => (
          <circle key={i} ref={(el) => { if (el) (starsRef.current[i] = el); }} cx={0} cy={0} r={1} fill="#fff" opacity={0.6} />
        ))}

        {/* nebulas (visual only) */}
        <g id="nebulas" opacity={0.9} pointerEvents="none">
          <circle cx={toNumber(0.15)} cy={toNumber(0.25)} r={toNumber(0.18)} fill="#82b4ff66" />
          <circle cx={toNumber(0.65)} cy={toNumber(0.15)} r={toNumber(0.22)} fill="#ff96c866" />
          <circle cx={toNumber(0.85)} cy={toNumber(0.65)} r={toNumber(0.2)} fill="#aaffc866" />
        </g>

        {/* world group that will be transformed by camera */}
        <g id="world">
          {/* luminous trail */}
          <path ref={trailRef as any} d="" stroke="url(#trailGrad)" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'blur(6px)' }} />

          {/* moons */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} ref={(el) => { if (el) (moonsRef.current[i] = el); }} cx={0} cy={0} r={2} fill="#fff" stroke="rgba(220,230,255,0.2)" strokeWidth={0.5} />
          ))}
        </g>

        {/* focused overlay layer (drawn in screen coordinates) */}
        <g ref={focusedLayerRef as any} pointerEvents="none">
          <rect x={0} y={0} width={1000} height={1000} fill="black" opacity={0} />
          <circle className="halo" cx={500} cy={500} r={0} fill="rgba(255,255,230,0.6)" />
          <circle className="focused" cx={500} cy={500} r={0} fill="#fff" />
        </g>
      </svg>

      <div className="fixed left-4 bottom-4 text-xs text-slate-300 bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-sm pointer-events-none">
        Clique em uma lua para focar • Clique de novo ou aperte Esc para voltar
      </div>
    </div>
  );
}

// small helper to allow JSX numbers from normalized coords inside render
function toNumber(n: number) { return Math.round(n * 1000); }

