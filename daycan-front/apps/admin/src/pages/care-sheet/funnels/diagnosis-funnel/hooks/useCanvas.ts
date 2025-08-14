import { useCallback, useEffect, useRef, useState } from "react";
import { COLORS } from "@daycan/ui";

export type CanvasPoint = { x: number; y: number };

export interface UseCanvasOptions {
  strokeColor?: string;
  lineWidth?: number;
}

export const useCanvas = (options?: UseCanvasOptions) => {
  const strokeColor = options?.strokeColor ?? COLORS.gray[700];
  const lineWidth = options?.lineWidth ?? 2.5;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Array<CanvasPoint | null>>([]);

  const drawPath = useCallback(
    (drawPoints?: Array<CanvasPoint | null>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const renderPoints = drawPoints ?? points;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = strokeColor as string;
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      let lastWasBreak = true; // 첫 점은 moveTo로 시작
      for (let i = 0; i < renderPoints.length; i++) {
        const p = renderPoints[i];
        if (p == null) {
          lastWasBreak = true;
          continue;
        }
        if (lastWasBreak) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
        lastWasBreak = false;
      }
      ctx.stroke();
    },
    [points, strokeColor, lineWidth]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    ctx.scale(dpr, dpr);
    drawPath();
  }, [drawPath]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    drawPath();
  }, [points, drawPath]);

  const getPos = useCallback(
    (e: PointerEvent | React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    },
    []
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
      setIsDrawing(true);
      const p = getPos(e);
      setPoints((prev) => {
        const needBreak = prev.length > 0 && prev[prev.length - 1] !== null;
        const next = needBreak ? [...prev, null, p] : [...prev, p];
        return next;
      });
    },
    [getPos]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const p = getPos(e);
      setPoints((prev) => [...prev, p]);
    },
    [getPos, isDrawing]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
      setIsDrawing(false);
      // 다음 스트로크가 이전 스트로크와 이어지지 않도록 분리 마커 추가
      setPoints((prev) => {
        if (prev.length === 0 || prev[prev.length - 1] === null) return prev;
        return [...prev, null];
      });
    },
    []
  );

  const clear = useCallback(() => {
    setPoints([]);
    drawPath([]);
  }, [drawPath]);

  const toDataURL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.toDataURL("image/png");
  }, []);

  return {
    canvasRef,
    containerRef,
    isDrawing,
    points,
    setPoints,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clear,
    toDataURL,
    resize,
  };
};
