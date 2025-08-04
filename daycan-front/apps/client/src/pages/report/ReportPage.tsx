import { useEffect, useState } from "react";
import { HighlightingHeading } from "@/components";
import { Heading } from "@daycan/ui";
import { StackCard } from "./components/StackCard/StackCard";
import { container, heading, headingContainer } from "./ReportPage.css";
import {
  HealthIndexCard,
  MealCard,
  HealthCheckCard,
  HealthImproveCard,
  CognitiveCard,
} from "./components";

export const ReportPage = () => {
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
            content: <CognitiveCard />,
          },
          {
            id: 2,
            content: <HealthImproveCard />,
          },
          {
            id: 3,
            content: <HealthCheckCard />,
          },
          {
            id: 4,
            content: <MealCard />,
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
