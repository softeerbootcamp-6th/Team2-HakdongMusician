import { Body, COLORS } from "@daycan/ui";
import { customTooltip } from "./CustomTooltip.css";

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={customTooltip}>
        <Body type="xsmall" weight={600} color={COLORS.gray[700]}>
          {payload[0].value.toFixed(1)}점
        </Body>
      </div>
    );
  }
  return null;
};
