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
import { useDailyReport } from "./hooks/useDailyReport";

export const DailyReportPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("김수진");
  const [isMale, setIsMale] = useState<boolean>(true);

  const {
    isLoading,
    error,
    getMealCardData,
    getHealthCheckCardData,
    getHealthImproveCardData,
    getCognitiveCardData,
    getHealthIndexCardData,
    getHealthIndexDescription,
  } = useDailyReport();

  useEffect(() => {
    setName("김수진");
    setDate(new Date());
    setIsMale(false);
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

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
            content: <CognitiveCard columns={getCognitiveCardData()} />,
          },
          {
            id: 2,
            content: <HealthImproveCard columns={getHealthImproveCardData()} />,
          },
          {
            id: 3,
            content: <HealthCheckCard rows={getHealthCheckCardData()} />,
          },
          {
            id: 4,
            content: <MealCard rows={getMealCardData()} />,
          },
          {
            id: 5,
            content: (
              <HealthIndexCard
                index={85}
                description={getHealthIndexDescription()}
                indexCardData={getHealthIndexCardData()}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
