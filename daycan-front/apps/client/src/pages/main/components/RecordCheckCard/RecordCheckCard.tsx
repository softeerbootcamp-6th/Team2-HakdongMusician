import { cardsContainer, card, recordsSection } from "./RecordCheckCard.css";
import reportFolder from "@/assets/png/report_folder.png";
import reportGraph from "@/assets/png/change_graph.png";
import { Body, COLORS, Heading } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
export const RecordCheckCard = () => {
  const navigate = useNavigate();
  return (
    <div className={recordsSection}>
      <Heading type="xsmall" weight={600} color={COLORS.gray[800]}>
        기록 확인하기
      </Heading>

      <div className={cardsContainer}>
        {/* 리포트 모아보기 카드 */}
        <div
          className={card}
          style={{
            backgroundImage: `url(${reportFolder})`,
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => navigate("/reports")}
        >
          <Body type="small" weight={600} color={COLORS.gray[900]}>
            리포트 모아보기
          </Body>
          <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
            지금까지 받은 매일의 리포트를 확인해요
          </Body>
        </div>

        {/* 변화 그래프 카드 */}
        <div
          className={card}
          style={{
            backgroundImage: `url(${reportGraph})`,
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Body type="small" weight={600} color={COLORS.gray[900]}>
            변화 그래프
          </Body>
          <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
            리포트들을 기반으로 변화를 한 눈에 봐요
          </Body>
        </div>
      </div>
    </div>
  );
};
