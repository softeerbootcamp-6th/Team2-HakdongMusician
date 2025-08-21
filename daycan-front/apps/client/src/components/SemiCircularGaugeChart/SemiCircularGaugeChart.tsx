import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { COLORS, Heading } from "@daycan/ui";
import type { CSSProperties } from "react";

interface SemiCircularGaugeChartProps {
  value: number; // 0 ~ 100
  width?: number;
  height?: number;
  fontType?: "xlarge" | "large" | "medium";
  barSize?: number;
  fontStyle?: CSSProperties;
}

export const SemiCircularGaugeChart = ({
  value,
  width = 150,
  height = 100,
  fontType = "medium",
  barSize = 30,
  fontStyle,
}: SemiCircularGaugeChartProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  // 점수에 따른 색상 결정
  const getColors = (score: number) => {
    if (score >= 70) {
      return {
        startColor: COLORS.red[500],
        endColor: COLORS.red[200],
        fontColor: COLORS.red[500], // 600 대신 500 사용
      };
    } else if (score >= 50) {
      return {
        startColor: COLORS.green[500],
        endColor: COLORS.green[200],
        fontColor: COLORS.green[500], // 600 대신 500 사용
      };
    } else {
      return {
        startColor: COLORS.blue[500],
        endColor: COLORS.blue[200],
        fontColor: COLORS.blue[500], // 600 대신 500 사용
      };
    }
  };

  const colors = getColors(clampedValue);

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
            <stop offset="20%" stopColor={colors.startColor} />
            <stop offset="100%" stopColor={colors.endColor} />
          </linearGradient>
        </defs>

        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={0} />
      </RadialBarChart>

      {/* 중앙 텍스트 - 점수에 따른 색상 적용 */}
      <Heading
        type={fontType}
        weight={600}
        style={{
          ...fontStyle,
          color: colors.fontColor,
        }}
      >
        {clampedValue}
      </Heading>
    </div>
  );
};
