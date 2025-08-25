import {
  BarChartComponent,
  ChartLayout,
  LineChartComponent,
  RangeViolationIndicator,
} from "./components";
import { formatAveragesToString, formatSingleAverageToString } from "./utils";
import {
  statisticsHeader,
  statisticsPageContainer,
  statisticsCalendarContainer,
  statisticsCalendarDateContainer,
  clickableIcon,
  statisticsChartContainer,
} from "./StatisticsPage.css";
import { Body, COLORS, Icon, Segment } from "@daycan/ui";
import { useStatistics } from "./hooks";
import { useNavigate } from "react-router-dom";

export const StatisticsPage = () => {
  const {
    selectedPeriod,
    currentDate,
    dailyScoreData,
    temperatureData,
    bloodPressureData,
    defecationData,
    urinationData,
    temperatureViolations,
    bloodPressureViolations,
    defecationViolations,
    urinationViolations,
    handlePeriodChange,
    handleChevronClick,
    isLoading,
    isError,
    error,
  } = useStatistics();

  const navigate = useNavigate();

  return (
    <div className={statisticsPageContainer}>
      {/* 헤더 컴포넌트 - 항상 고정 */}
      <div className={statisticsHeader}>
        <Icon
          name="chevronLeft"
          width={24}
          height={24}
          color={COLORS.gray[50]}
          onClick={() => navigate("/", { replace: true })}
        />
        <Body type="large" weight={600}>
          변화 리포트
        </Body>
        <div></div>
      </div>

      {/* 날짜 선택 컴포넌트 - 항상 고정 */}
      <div className={statisticsCalendarContainer}>
        <Segment
          options={["1주일", "1개월", "6개월"]}
          value={selectedPeriod}
          onSegmentChange={(value) =>
            handlePeriodChange(value as "1주일" | "1개월" | "6개월")
          }
          fontSize="medium"
        />
        <div className={statisticsCalendarDateContainer}>
          <Icon
            name="chevronLeft"
            width={16}
            height={16}
            color={COLORS.gray[50]}
            onClick={() => handleChevronClick("left")}
            className={clickableIcon}
          />
          <Body type="medium" weight={600}>
            {currentDate.start} - {currentDate.end}
          </Body>
          <Icon
            name="chevronRight"
            width={16}
            height={16}
            color={COLORS.gray[50]}
            onClick={() => handleChevronClick("right")}
            className={clickableIcon}
          />
        </div>
      </div>

      {/* 차트 컴포넌트 - 로딩/에러 상태에 따라 다르게 표시 */}
      <div className={statisticsChartContainer}>
        {isLoading ? (
          // 로딩 상태 - 차트 영역만
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              width: "100%",
            }}
          >
            <Body type="large">데이터를 불러오는 중...</Body>
          </div>
        ) : isError ? (
          // 에러 상태 - 차트 영역만
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              width: "100%",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Body type="large">데이터를 불러오는 중 오류가 발생했습니다.</Body>
            <Body type="medium" color={COLORS.gray[500]}>
              {error?.message || "알 수 없는 오류입니다."}
            </Body>
          </div>
        ) : (
          // 정상 상태 - 모든 차트 표시
          <>
            {/* API 데이터 - 건강지수 차트 */}
            <ChartLayout title="종합건강지수" iconName="health">
              <BarChartComponent
                data={dailyScoreData.data}
                height={260}
                averageValue={formatSingleAverageToString(
                  dailyScoreData.averages.dailyScoreValues,
                  "점"
                )}
                dataKeys={["dailyScoreValues"]}
                unit="점"
              />
            </ChartLayout>

            {/* API 데이터 - 체온 차트 */}
            <ChartLayout title="체온 (°C)" iconName="thermometer">
              <RangeViolationIndicator violation={temperatureViolations} />
              <LineChartComponent
                data={temperatureData.data}
                height={260}
                averageValue={formatSingleAverageToString(
                  temperatureData.averages.temperatureValues,
                  "°C"
                )}
                lineNames={temperatureData.lineNames}
                normalRanges={[{ start: 36, end: 37.5 }]}
                yAxisDomain={[35, 40]}
                unit="°C"
              />
            </ChartLayout>

            {/* API 데이터 - 혈압 차트 (수축기 + 이완기) */}
            <ChartLayout title="혈압 (수축기 / 이완기)" iconName="heartbeat">
              <RangeViolationIndicator
                violation={bloodPressureViolations.systolic}
                label="수축기 혈압 위반"
              />
              <RangeViolationIndicator
                violation={bloodPressureViolations.diastolic}
                label="이완기 혈압 위반"
              />
              <LineChartComponent
                data={bloodPressureData.data}
                height={260}
                averageValue={formatAveragesToString(
                  bloodPressureData.averages,
                  "mmHg"
                )}
                lineNames={bloodPressureData.lineNames}
                normalRanges={[
                  { start: 90, end: 120 },
                  { start: 60, end: 80 },
                ]}
                yAxisDomain={[40, 160]}
                unit="mmHg"
              />
            </ChartLayout>

            {/* API 데이터 - 배변 횟수 차트 */}
            <ChartLayout title="배변 횟수 " iconName="toilet">
              <RangeViolationIndicator
                violation={defecationViolations}
                label="배변 횟수 위반"
              />
              <LineChartComponent
                data={defecationData.data}
                height={260}
                averageValue={formatSingleAverageToString(
                  defecationData.averages.defecationCountValues,
                  "회"
                )}
                lineNames={defecationData.lineNames}
                normalRanges={[{ start: 1, end: 3 }]}
                yAxisDomain={[0, 5]}
                unit="회"
              />
            </ChartLayout>

            {/* API 데이터 - 배뇨 횟수 차트 */}
            <ChartLayout title="배뇨 횟수" iconName="waterdrop">
              <RangeViolationIndicator
                violation={urinationViolations}
                label="배뇨 횟수 위반"
              />
              <LineChartComponent
                data={urinationData.data}
                height={260}
                averageValue={formatSingleAverageToString(
                  urinationData.averages.urinationCountValues,
                  "회"
                )}
                lineNames={urinationData.lineNames}
                normalRanges={[{ start: 3, end: 6 }]}
                yAxisDomain={[0, 10]}
                unit="회"
              />
            </ChartLayout>
          </>
        )}
      </div>
    </div>
  );
};
