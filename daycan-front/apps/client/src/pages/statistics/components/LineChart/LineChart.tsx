import { Body, COLORS, Heading } from "@daycan/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import {
  statisticsContainer,
  statisticsHeader,
  normalRangeBox,
  legendContainer,
  legendItem,
  legendColorBox,
  legendText,
  normalRangeLegendItem,
  normalRangeLegendText,
} from "./LineChart.css";
import { CustomTooltip } from "./CustomTooltip";
import { getLineColors, getDataKeys, getLineNames } from "../../utils";

interface LineChartProps {
  data: any[]; // 동적 데이터를 위해 any 사용
  width: number;
  height: number;
  // 확장성을 위한 props
  averageValue: string;
  normalRanges?: Array<{ start: number; end: number }>;
  lineNames?: { key: string; value: string }[]; // 선택적으로 변경
  yAxisDomain?: [number, number];
  // 동적 파싱을 위한 설정
  xAxisKey?: string; // X축 키 (기본값: "name")
  dataKeys?: string[]; // 데이터 키들 (자동 추출하거나 직접 지정)
  unit?: string;
}

export const LineChartComponent = ({
  data,

  height,
  averageValue,
  normalRanges = [
    { start: 60, end: 80 },
    { start: 90, end: 120 },
  ],
  lineNames,
  yAxisDomain = [40, 160],
  xAxisKey = "name",
  dataKeys,
  unit,
}: LineChartProps) => {
  const keys = getDataKeys(data, dataKeys, xAxisKey);
  const finalLineNames = getLineNames(data, lineNames, keys, xAxisKey);
  const lineColors = getLineColors(finalLineNames.length);

  return (
    <div className={statisticsContainer}>
      <div className={statisticsHeader}>
        <Body type="small" color={COLORS.gray[500]}>
          평균
        </Body>
        <Heading type="xsmall" weight={600} color={COLORS.gray[700]}>
          {averageValue}
        </Heading>
      </div>
      <ResponsiveContainer width={"100%"} height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gray[200]} />
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: COLORS.gray[600] }}
          />
          <YAxis
            domain={yAxisDomain}
            tickLine={false}
            axisLine={false}
            orientation="right"
            tick={{ fontSize: 12, fill: COLORS.gray[600] }}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend
            content={({ payload }) => (
              <div className={legendContainer}>
                {payload?.map((entry, index) => (
                  <div key={index} className={legendItem}>
                    <div
                      className={legendColorBox}
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className={legendText}>{entry.value}</span>
                  </div>
                ))}
                {normalRanges.length > 0 && (
                  <div className={normalRangeLegendItem}>
                    <div className={normalRangeBox} />
                    <span className={normalRangeLegendText}>정상 범위</span>
                  </div>
                )}
              </div>
            )}
          />
          {/* 정상 범위 표시 - 동적으로 생성 */}
          {normalRanges.map((range, index) => (
            <ReferenceArea
              key={index}
              y1={range.start}
              y2={range.end}
              fill={COLORS.yellow[200]}
              fillOpacity={0.3}
              stroke={COLORS.yellow[500]}
              strokeWidth={1}
            />
          ))}
          {/* Line들을 동적으로 생성 */}
          {finalLineNames.map((lineName, index) => (
            <Line
              key={lineName.key}
              type="monotone"
              dataKey={keys[index]}
              stroke={lineColors[index]}
              strokeWidth={finalLineNames.length === 1 ? 2 : 1}
              dot={{
                fill: lineColors[index],
                strokeWidth: 2,
                r: 4,
              }}
              name={lineName.value}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
