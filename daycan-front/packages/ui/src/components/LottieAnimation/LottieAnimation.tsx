import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  animationData: any; // Lottie JSON 데이터
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number; // 애니메이션 속도 (기본값: 1)
  onComplete?: () => void;
  className?: string;
}

export const LottieAnimation = ({
  animationData,
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  speed = 1,
  onComplete,
  className,
}: LottieAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && animationData) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });

      // 속도 설정
      animationRef.current.setSpeed(speed);

      if (onComplete) {
        animationRef.current.addEventListener("complete", onComplete);
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    }
  }, [animationData, loop, autoplay, speed, onComplete]);

  return (
    <div ref={containerRef} style={{ width, height }} className={className} />
  );
};
