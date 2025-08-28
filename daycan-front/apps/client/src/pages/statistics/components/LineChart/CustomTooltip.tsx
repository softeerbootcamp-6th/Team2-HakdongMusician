import { Body } from "@daycan/ui";
import { customTooltip } from "./CustomTooltip.css";

export const CustomTooltip = ({ active, payload, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={customTooltip}>
        {payload.map((entry: any, index: number) => (
          <Body
            key={index}
            type="xsmall"
            weight={600}
            color={entry.color}
            style={{ margin: "2px 0" }}
          >
            {entry.name}: {entry.value.toFixed(1)} {unit}
          </Body>
        ))}
      </div>
    );
  }
  return null;
};
