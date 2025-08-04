import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { COLORS, Heading } from "@daycan/ui";
import type { CSSProperties } from "react";

interface SemiCircularGaugeChartProps {
  value: number; // 0 ~ 100
  startColor?: string;
  endColor?: string;
  width?: number;
  height?: number;
  fontType?: "xlarge" | "large" | "medium";
  barSize?: number;
  fontStyle?: CSSProperties;
}

export const SemiCircularGaugeChart = ({
  value,
  startColor = COLORS.red[500],
  endColor = COLORS.red[200],
  width = 150,
  height = 100,
  fontType = "medium",
  barSize = 30,
  fontStyle,
}: SemiCircularGaugeChartProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const data = [
    { name: "progress", value: clampedValue, fill: "url(#gaugeGradient)" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RadialBarChart
        width={width}
        height={height}
        cx="50%"
        cy="100%"
        innerRadius="70%"
        outerRadius="170%"
        startAngle={180}
        endAngle={0}
        data={data}
        barSize={barSize}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="20%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={0} />
      </RadialBarChart>

      {/* 중앙 텍스트 */}
      <Heading type={fontType} weight={600} style={fontStyle}>
        {clampedValue}
      </Heading>
    </div>
  );
};
