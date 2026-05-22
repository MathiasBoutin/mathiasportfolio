"use client";

import * as React from "react";

const GRID_SIZE = 28;
const BASE_DOT_RADIUS = 0.75;
const HOVER_RADIUS = 300;
const MAX_DOT_RADIUS_DELTA = 0.3;
const MAX_DISPLACEMENT = 5.5;
const POINTER_SMOOTHING = 0.085;

type GridPoint = {
  x: number;
  y: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

function getCursorFalloff(normalizedDistance: number) {
  const t = Math.max(0, 1 - normalizedDistance);
  // Smoothstep: gentler ramp toward center than quadratic falloff.
  return t * t * (3 - 2 * t);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReducedMotion(mediaQuery.matches);

    function handleChange() {
      setReducedMotion(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

function getDotTransform(point: GridPoint, pointer: PointerState, reducedMotion: boolean) {
  if (!pointer.active || reducedMotion) {
    return {
      x: point.x,
      y: point.y,
      radius: BASE_DOT_RADIUS,
      opacity: 1,
    };
  }

  const dx = point.x - pointer.x;
  const dy = point.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  const normalizedDistance = Math.min(distance / HOVER_RADIUS, 1);
  const influence = getCursorFalloff(normalizedDistance);

  if (influence <= 0) {
    return {
      x: point.x,
      y: point.y,
      radius: BASE_DOT_RADIUS,
      opacity: 1,
    };
  }

  const directionX = distance === 0 ? 0 : dx / distance;
  const directionY = distance === 0 ? 0 : dy / distance;
  const displacementInfluence = easeOutCubic(influence);
  const displacement = displacementInfluence * MAX_DISPLACEMENT;

  return {
    x: point.x + directionX * displacement,
    y: point.y + directionY * displacement,
    radius: BASE_DOT_RADIUS + displacementInfluence * MAX_DOT_RADIUS_DELTA,
    opacity: 0.82 + displacementInfluence * 0.18,
  };
}

export function DesktopMockGridOverlay() {
  const rootRef = React.useRef<SVGSVGElement | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const targetPointerRef = React.useRef<PointerState>({
    x: 0,
    y: 0,
    active: false,
  });
  const reducedMotion = useReducedMotion();
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [pointer, setPointer] = React.useState<PointerState>({
    x: 0,
    y: 0,
    active: false,
  });

  React.useEffect(() => {
    const element = rootRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const { width, height } = entry.contentRect;
      setSize({
        width: Math.round(width),
        height: Math.round(height),
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const points = React.useMemo(() => {
    if (size.width <= 0 || size.height <= 0) {
      return [];
    }

    const rows = Math.ceil(size.height / GRID_SIZE) + 1;
    const columns = Math.ceil(size.width / GRID_SIZE) + 1;

    return Array.from({ length: rows * columns }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);

      return {
        x: column * GRID_SIZE + GRID_SIZE / 2,
        y: row * GRID_SIZE + GRID_SIZE / 2,
      };
    });
  }, [size.height, size.width]);

  function schedulePointerSmoothing() {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(function smoothPointer() {
      animationFrameRef.current = null;
      const target = targetPointerRef.current;

      setPointer((current) => {
        if (!target.active) {
          return current.active ? { ...current, active: false } : current;
        }

        const x = current.x + (target.x - current.x) * POINTER_SMOOTHING;
        const y = current.y + (target.y - current.y) * POINTER_SMOOTHING;
        const settled =
          Math.hypot(target.x - x, target.y - y) < 0.25 &&
          Math.abs(current.x - x) < 0.01 &&
          Math.abs(current.y - y) < 0.01;

        return {
          x: settled ? target.x : x,
          y: settled ? target.y : y,
          active: true,
        };
      });

      if (targetPointerRef.current.active) {
        schedulePointerSmoothing();
      }
    });
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const element = rootRef.current;

    if (!element || reducedMotion) {
      return;
    }

    const rect = element.getBoundingClientRect();
    targetPointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };

    schedulePointerSmoothing();
  }

  function handlePointerLeave() {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    targetPointerRef.current = {
      ...targetPointerRef.current,
      active: false,
    };

    setPointer((current) => ({
      ...current,
      active: false,
    }));
  }

  return (
    <svg
      ref={rootRef}
      className="absolute inset-0 z-0 size-full rounded-[16px] text-[var(--desktop-mock-grid-dot)] [mask-image:var(--desktop-mock-grid-mask)] [-webkit-mask-image:var(--desktop-mock-grid-mask)]"
      aria-hidden
      viewBox={`0 0 ${Math.max(size.width, 1)} ${Math.max(size.height, 1)}`}
      preserveAspectRatio="none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {points.map((point) => {
        const dot = getDotTransform(point, pointer, reducedMotion);

        return (
          <circle
            key={`${point.x}-${point.y}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.radius}
            fill="currentColor"
            opacity={dot.opacity}
          />
        );
      })}
    </svg>
  );
}
