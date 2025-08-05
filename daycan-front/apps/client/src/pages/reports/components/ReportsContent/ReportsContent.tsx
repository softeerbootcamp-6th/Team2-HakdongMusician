import { Body, Calendar, Chip, COLORS, Icon } from "@daycan/ui";
import {
  reportsContentContainer,
  reportsContentHeader,
  reportsContentBody,
  reportsContentHeaderLeft,
  reportsContentHeaderRight,
  dateContainer,
} from "./ReportsContent.css";
import {
  HealthCheckCard,
  HealthIndexCard,
  HealthImproveCard,
  CognitiveCard,
  MealCard,
} from "../../../daily-report/components";
import { useState } from "react";
import { getDateString, isToday } from "../../../../utils/dateUtils";

export const ReportsContent = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className={reportsContentContainer}>
      <div className={reportsContentHeader}>
        <div className={reportsContentHeaderLeft}>
          <Icon
            name="chevronLeft"
            width={24}
            height={24}
            color={COLORS.white}
            onClick={() => {
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() - 1))
              );
            }}
          />
          <div className={dateContainer}>
            {isToday(selectedDate) && (
              <Chip
                round="default"
                flexRule="center"
                style={{
                  backgroundColor: COLORS.gray[200],
                  color: COLORS.gray[700],
                  padding: "6px 12px",
                  borderRadius: 4,
                }}
              >
                오늘
              </Chip>
            )}
            <Body type="medium" weight={600} color={COLORS.gray[900]}>
              {getDateString(selectedDate)}
            </Body>
          </div>
          <Icon
            name="chevronRight"
            width={24}
            height={24}
            color={COLORS.white}
            onClick={() => {
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 1))
              );
            }}
          />
        </div>

        <div className={reportsContentHeaderRight}>
          <Icon
            name="calendar"
            width={28}
            height={28}
            color={COLORS.gray[900]}
            onClick={() => {
              setIsCalendarOpen(true);
            }}
          />
        </div>
      </div>

      <div className={reportsContentBody}>
        {isCalendarOpen && (
          <Calendar
            onDateSelect={(date) => {
              setSelectedDate(date);
            }}
            onConfirm={(date) => {
              setSelectedDate(date);
              setIsCalendarOpen(false);
            }}
            initialDate={selectedDate}
          />
        )}
        {/* TODO - API 명세 나온 후에, 아이콘 매핑 및 데이터 타입 수정 필요 */}
        <HealthIndexCard
          index={85}
          description="대충 진짜 너무 잘 하셔서 스껄하시다는 뜻 ㅎㅎ 와우와우와우~!!"
          indexCardData={[
            { title: "식사", value: 15 },
            { title: "건강", value: 15 },
            { title: "신체", value: 15 },
            { title: "인지", value: 15 },
          ]}
          isDropdown={true}
        />

        <MealCard
          isDropdown={true}
          rows={[
            {
              key: "아침",
              value: "오늘은 아침을 했어요!",
              warningDescription: "반찬 투정을 하셨어요",
            },
          ]}
        />
        <HealthCheckCard
          isDropdown={true}
          rows={[
            {
              key: "혈압",
              value: "120/80",
            },
          ]}
        />
        <HealthImproveCard
          isDropdown={true}
          columns={[
            {
              key: "게이트 볼",
              value: "게이트 볼을 통해서, 몸과 마음을 단련시켰어요.",
            },
          ]}
        />
        <CognitiveCard
          isDropdown={true}
          columns={[
            {
              key: "노래부르기",
              value: "노래부르기 활동을 통해서, 몸과 마음을 단련시켰어요.",
            },
          ]}
        />
      </div>
    </div>
  );
};
