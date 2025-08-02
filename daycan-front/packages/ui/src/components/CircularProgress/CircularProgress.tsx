import { classNames } from "../../utils";
import {
  circularProgress,
  circularProgressContainer,
  circularProgressSvg,
  circularProgressCircle,
  circularProgressTrack,
  circularProgressIndicator,
  circularProgressText,
} from "./CircularProgress.css";

export interface CircularProgressProps {
  value: number;
  max?: number;
  showText?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
}

export const CircularProgress = ({
  value,
  max = 4,
  showText = true,
  size,
  className,
}: CircularProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // radius는 전체 svgContainer 의 반으로 계산
  const radius = size === "small" ? 16 : size === "large" ? 32 : 24;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={classNames(circularProgressContainer, className)}>
      <div className={classNames(circularProgress({ size }))}>
        <svg className={circularProgressSvg}>
          <circle
            className={classNames(
              circularProgressCircle,
              circularProgressTrack,
            )}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
          <circle
            className={classNames(
              circularProgressCircle,
              circularProgressIndicator,
            )}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {showText && (
          <div className={circularProgressText}>
            {value}/{max}
          </div>
        )}
      </div>
    </div>
  );
};
