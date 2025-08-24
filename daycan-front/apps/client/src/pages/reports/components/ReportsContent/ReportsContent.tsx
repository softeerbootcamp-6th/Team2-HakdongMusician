import { Body, Calendar, Chip, COLORS, Icon } from "@daycan/ui";
import {
  reportsContentContainer,
  reportsContentHeader,
  reportsContentBody,
  reportsContentHeaderLeft,
  reportsContentHeaderRight,
  dateContainer,
  emptyDataContainer,
} from "./ReportsContent.css";
import {
  HealthCheckCard,
  HealthIndexCard,
  HealthImproveCard,
  CognitiveCard,
  MealCard,
} from "../../../daily-report/components";
import { getDateString, isToday } from "../../../../utils/dateUtils";
import { useReportDateSelection } from "../../hooks";

export const ReportsContent = () => {
  const {
    isCalendarOpen,
    selectedDate,
    availableDates,
    reportsData,
    isLoading,
    isError,
    openCalendar,
    handleDateSelect,
    handleDateConfirm,
    handleMonthChange,
  } = useReportDateSelection();

  return (
    <div className={reportsContentContainer}>
      <div className={reportsContentHeader}>
        <div className={reportsContentHeaderLeft}>
          <div className={dateContainer}>
            <Body type="medium" weight={600} color={COLORS.gray[900]}>
              {getDateString(selectedDate)}
            </Body>
          </div>
          {isToday(selectedDate) && (
            <Chip
              round="l"
              flexRule="center"
              color="green"
              style={{ padding: "8px 12px" }}
            >
              오늘
            </Chip>
          )}
        </div>

        <div className={reportsContentHeaderRight}>
          <Icon
            name="calendar"
            width={28}
            height={28}
            color={COLORS.gray[900]}
            onClick={openCalendar}
          />
        </div>
      </div>

      <div className={reportsContentBody}>
        {isCalendarOpen && (
          <Calendar
            onDateSelect={handleDateSelect}
            onConfirm={handleDateConfirm}
            initialDate={selectedDate}
            availableDates={availableDates}
            onMonthChange={handleMonthChange}
          />
        )}
        {isLoading ? (
          <div className={emptyDataContainer}>
            <Body type="medium">데이터를 불러오는 중...</Body>
          </div>
        ) : isError ? (
          <div className={emptyDataContainer}>
            <Body type="medium">데이터를 불러오는데 실패했습니다.</Body>
          </div>
        ) : reportsData ? (
          <>
            <HealthIndexCard
              index={reportsData.fullReportDto.totalScore}
              changeAmount={reportsData.fullReportDto.changeAmount}
              indexCardData={[
                { title: "식사", value: reportsData.fullReportDto.mealScore },
                { title: "건강", value: reportsData.fullReportDto.healthScore },
                {
                  title: "신체",
                  value: reportsData.fullReportDto.physicalScore,
                },
                {
                  title: "인지",
                  value: reportsData.fullReportDto.cognitiveScore,
                },
              ]}
              isDropdown={true}
            />

            <MealCard
              isDropdown={true}
              rows={reportsData.fullReportDto.mealEntries?.map((entry) => ({
                key: entry.key,
                value: entry.value,
                warningDescription: entry.warning,
              }))}
              score={reportsData.fullReportDto.mealCardFooter?.score ?? 15}
              additionalMemo={
                reportsData.fullReportDto.mealCardFooter?.additionalMemo ?? ""
              }
            />

            <HealthCheckCard
              isDropdown={true}
              rows={reportsData.fullReportDto.healthEntries?.map((entry) => ({
                key: entry.key,
                value: entry.value,
                warningDescription: entry.warning,
              }))}
              score={reportsData.fullReportDto.healthCardFooter?.score ?? 15}
              additionalMemo={
                reportsData.fullReportDto.healthCardFooter?.additionalMemo ?? ""
              }
            />

            <HealthImproveCard
              isDropdown={true}
              columns={reportsData.fullReportDto.physicalEntries?.map(
                (entry) => ({
                  key: entry.key,
                  value: entry.value,
                  specificDescription: entry.additionalInfo,
                })
              )}
              score={reportsData.fullReportDto.physicalCardFooter?.score ?? 15}
              additionalMemo={
                reportsData.fullReportDto.physicalCardFooter?.additionalMemo ??
                ""
              }
            />

            <CognitiveCard
              isDropdown={true}
              columns={reportsData.fullReportDto.cognitiveEntries?.map(
                (entry) => ({
                  key: entry.key,
                  value: entry.value,
                  specificDescription: entry.additionalInfo,
                })
              )}
              score={reportsData.fullReportDto.cognitiveCardFooter?.score ?? 15}
              additionalMemo={
                reportsData.fullReportDto.cognitiveCardFooter?.additionalMemo ??
                ""
              }
            />
          </>
        ) : (
          <div className={emptyDataContainer}>
            <Body type="medium">데이터가 없습니다.</Body>
          </div>
        )}
      </div>
    </div>
  );
};
