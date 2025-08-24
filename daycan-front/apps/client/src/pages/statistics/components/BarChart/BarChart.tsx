import { Body, COLORS, Heading } from "@daycan/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  statisticsContainer,
  statisticsHeader,
  emptyStateContainer,
} from "./BarChart.css";
import { CustomTooltip } from "./CustomTooltip";
import { getDataKeys } from "../../utils";

interface BarChartProps {
  data: any[];
  height: number;
  averageValue: string;
  xAxisKey?: string;
  dataKeys?: string[];
  yAxisDomain?: [number, number];
  unit?: string;
}

export const BarChartComponent = ({
  data,
  height,
  averageValue,
  xAxisKey = "name",
  dataKeys,
  yAxisDomain = [0, 100],
  unit,
}: BarChartProps) => {
  const keys = getDataKeys(data, dataKeys, xAxisKey);
  const primaryDataKey = keys.length > 0 ? keys[0] : "dailyScoreValues";
  const hasData = data && data.length > 0;

  return (
    <div className={statisticsContainer}>
      <div className={statisticsHeader}>
        <Body type="small" color={COLORS.gray[500]}>
          평균
        </Body>
        <Heading type="xsmall" weight={600} color={COLORS.gray[700]}>
          {hasData ? averageValue : "0.0점"}
        </Heading>
      </div>
      {!hasData ? (
        <div className={emptyStateContainer} style={{ width: "100%", height }}>
          <Body type="medium" color={COLORS.gray[500]}>
            데이터가 없습니다
          </Body>
        </div>
      ) : (
        <ResponsiveContainer width={"100%"} height={height}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              bottom: 5,
              left: 10,
              right: -20,
            }}
          >
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
            <Bar
              barSize={20}
              dataKey={primaryDataKey}
              fill={COLORS.gray[600]}
              radius={6}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
