import { Button, Heading, Body } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
import { container, card, illust, actions } from "./NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={container}>
      <div className={card}>
        {/* 404 일러스트 */}
        <div className={illust}>
          <svg
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="56" cy="56" r="56" fill="#FEF3C7" />
            <path
              d="M40 40h32v32H40z"
              fill="#F59E0B"
              stroke="#92400E"
              strokeWidth="2"
            />
            <text
              x="56"
              y="65"
              textAnchor="middle"
              fill="#92400E"
              fontSize="24"
              fontWeight="bold"
            >
              404
            </text>
          </svg>
        </div>

        {/* 제목 */}
        <Heading>페이지를 찾을 수 없습니다</Heading>

        {/* 설명 */}
        <Heading>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Heading>
        <Body type="medium">URL을 확인하거나 아래 버튼을 이용해주세요.</Body>

        {/* 액션 버튼들 */}
        <div className={actions}>
          <Button variant="primary" size="large" onClick={handleGoHome}>
            홈으로 이동
          </Button>
          <Button variant="unEmphasized" size="large" onClick={handleGoBack}>
            이전 페이지
          </Button>
        </div>
      </div>
    </div>
  );
};
