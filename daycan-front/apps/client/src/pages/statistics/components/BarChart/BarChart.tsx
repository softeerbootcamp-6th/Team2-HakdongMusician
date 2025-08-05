import { useEffect } from "react";
import { useState } from "react";
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
import { statisticsContainer, statisticsHeader } from "./BarChart.css";
import { CustomTooltip } from "./CustomTooltip";

interface BarChartProps {
  data: { name: string; value: number }[];
  width: number;
  height: number;
}

export const BarChartComponent = ({ data, width, height }: BarChartProps) => {
  const [average, setAverage] = useState(60);

  useEffect(() => {
    //TODO - 평균 계산 로직 추가
    setAverage(data[0].value);
  }, []);

  return (
    <div className={statisticsContainer}>
      <div className={statisticsHeader}>
        <Body type="small" color={COLORS.gray[500]}>
          평균
        </Body>

        <Heading type="xsmall" weight={600} color={COLORS.gray[700]}>
          {average}점
        </Heading>
      </div>
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            barSize={20}
            dataKey="value"
            fill={COLORS.gray[600]}
            radius={6}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            orientation="right"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
