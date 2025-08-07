import { useEffect, useState } from "react";
import { Heading, HighlightingHeading } from "@daycan/ui";
import { StackCard } from "./components/StackCard/StackCard";
import { container, heading, headingContainer } from "./DailyReportPage.css";
import {
  HealthIndexCard,
  MealCard,
  HealthCheckCard,
  HealthImproveCard,
  CognitiveCard,
} from "./components";

export const DailyReportPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("김수진");
  const [isMale, setIsMale] = useState<boolean>(true);

  useEffect(() => {
    setName("김수진");
    setDate(new Date());
    setIsMale(false);
  }, []);

  return (
    <div className={container}>
      <div className={headingContainer}>
        <div className={heading}>
          <HighlightingHeading text={name} />
          <Heading type="medium">{isMale ? "할아버지" : "할머니"}의</Heading>
        </div>
        <Heading type="medium">{date.toLocaleDateString()} 리포트예요</Heading>
      </div>

      <StackCard
        cardsData={[
          {
            id: 1,
            content: (
              <CognitiveCard
                columns={[
                  {
                    key: "노래부르기",
                    value: "오늘은 노래부르기 활동을 했어요!",
                    specificDescription:
                      "노래부르기 활동을 통해서, 몸과 마음을 단련시켰어요.",
                  },
                ]}
              />
            ),
          },
          {
            id: 2,
            content: (
              <HealthImproveCard
                columns={[
                  {
                    key: "게이트 볼",
                    value: "게이트 볼을 통해서, 몸과 마음을 단련시켰어요.",
                  },
                ]}
              />
            ),
          },
          {
            id: 3,
            content: (
              <HealthCheckCard
                rows={[
                  {
                    key: "혈압",
                    value: "120/80",
                  },
                  {
                    key: "체온",
                    value: "36.5℃",
                  },
                ]}
              />
            ),
          },
          {
            id: 4,
            content: (
              <MealCard
                rows={[
                  {
                    key: "아침",
                    value: "오늘은 아침을 했어요!",
                    warningDescription: "반찬 투정을 하셨어요",
                  },
                  {
                    key: "점심",
                    value: "오늘은 점심을 했어요!",
                    warningDescription:
                      "차은우가 먹여주는 게 아니라면 안 먹는대요",
                  },
                  {
                    key: "저녁",
                    value: "오늘은 저녁을 했어요!",
                  },
                ]}
              />
            ),
          },
          {
            id: 5,
            content: (
              <HealthIndexCard
                index={85}
                description="대충 진짜 너무 잘 하셔서 스껄하시다는 뜻 ㅎㅎ 와우와우와우~!!"
                indexCardData={[
                  { title: "식사", value: 15 },
                  { title: "건강", value: 15 },
                  { title: "신체", value: 15 },
                  { title: "인지", value: 15 },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
