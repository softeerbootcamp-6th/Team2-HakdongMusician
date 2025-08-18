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
import { Loading } from "@/components";

export const DailyReportPage = () => {
  const {
    getMealCardData,
    getHealthCheckCardData,
    getHealthIndexTotalScore,
    getHealthIndexChangeAmount,
    getHealthIndexCardData,
    getIndividualHealthImproveCards,
    getIndividualCognitiveCards,
    getMealCardFooter,
    getHealthCardFooter,
    getPhysicalCardFooter,
    getCognitiveCardFooter,
    isLoading,
    isError,
  } = useDailyReport();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // 개별 신체 건강 개선 카드들 생성
  const healthImproveCards = getIndividualHealthImproveCards().map(
    (cardData, index) => ({
      id: 100 + index, // 숫자 ID
      content: (
        <HealthImproveCard
          columns={cardData.data}
          score={getPhysicalCardFooter().score}
          additionalMemo={getPhysicalCardFooter().memo}
        />
      ),
    })
  );

  // 개별 인지능력 카드들 생성
  const cognitiveCards = getIndividualCognitiveCards().map(
    (cardData, index) => ({
      id: 200 + index, // 숫자 ID
      content: (
        <CognitiveCard
          columns={cardData.data}
          score={getCognitiveCardFooter().score}
          additionalMemo={getCognitiveCardFooter().memo}
        />
      ),
    })
  );

  return (
    <div className={container}>
      <div className={headingContainer}>
        <div className={heading}>
          <HighlightingHeading text={new Date().toLocaleDateString()} />
        </div>
        <Heading type="medium">
          데일리 리포트 입니다. <br />
          카드를 넘기며 확인해보세요!
        </Heading>
      </div>

      <StackCard
        cardsData={[
          // 개별 인지능력 카드들 (인지 능력 카드는 모두 개별 카드로 처리)
          ...cognitiveCards,
          // 개별 신체 건강 개선 카드들 (신체 건강 개선 카드는 모두 개별 카드로 처리)
          ...healthImproveCards,
          // 기존 카드들
          {
            id: 1,
            content: (
              <HealthCheckCard
                rows={getHealthCheckCardData() ?? []}
                score={getHealthCardFooter().score}
                additionalMemo={getHealthCardFooter().memo}
              />
            ),
          },
          {
            id: 2,
            content: (
              <MealCard
                rows={getMealCardData() ?? []}
                score={getMealCardFooter().score}
                additionalMemo={getMealCardFooter().memo}
              />
            ),
          },
          {
            id: 3,
            content: (
              <HealthIndexCard
                index={getHealthIndexTotalScore()}
                changeAmount={getHealthIndexChangeAmount()}
                indexCardData={getHealthIndexCardData()}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
