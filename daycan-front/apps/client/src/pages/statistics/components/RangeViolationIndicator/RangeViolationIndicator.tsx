import { Body, COLORS } from "@daycan/ui";
import { type RangeViolation } from "../../utils/rangeUtils";
import { rangeViolationIndicatorContainer } from "./RangeViolationIndicator.css";

interface RangeViolationIndicatorProps {
  violation: RangeViolation;
  label?: string;
  showPercentage?: boolean;
}

export const RangeViolationIndicator = ({
  violation,
  label = "정상 범위 벗어남",
  showPercentage = true,
}: RangeViolationIndicatorProps) => {
  const getViolationColor = (percentage: number) => {
    if (percentage === 0) return COLORS.green[500]; // 녹색 - 정상
    if (percentage <= 50) return COLORS.yellow[500]; // 주황색 - 주의
    return COLORS.red[500]; // 빨간색 - 위험
  };

  const violationColor = getViolationColor(violation.percentage);

  return (
    <div className={rangeViolationIndicatorContainer}>
      <Body type="xsmall" color={COLORS.gray[500]}>
        {label}:
      </Body>
      <Body type="xsmall" color={violationColor} weight={600}>
        {violation.count}회{showPercentage && ` (${violation.percentage}%)`}
      </Body>
    </div>
  );
};
