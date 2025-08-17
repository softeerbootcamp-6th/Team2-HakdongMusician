import { Button, Heading, Body, Icon, COLORS } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
import {
  container,
  card,
  illust,
  actions,
  pcDescriptionWrapper,
  mobileDescriptionWrapper,
  alertNotFoundIcon,
} from "./NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // TODO: 보길
    // 일단 이렇게 해봤는데 따로 home 페이지를 만들어 보는것도 좋아 보기이도 합니다.
    const pathname = window.location.pathname;
    if (pathname.includes("/care-sheet/new")) {
      navigate("/care-sheet/new");
    } else {
      navigate("/");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={container}>
      <div className={card}>
        {/* 404 일러스트 */}
        <div className={illust}>
          <Icon
            name="alertNotFound"
            width={200}
            height={200}
            className={alertNotFoundIcon}
          />
        </div>

        {/* 제목 */}
        <div className={pcDescriptionWrapper}>
          <Heading style={{ textAlign: "center" }}>
            페이지를 찾을 수 없습니다 <br />
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </Heading>

          <Body type="medium">URL을 확인하거나 아래 버튼을 이용해주세요.</Body>
        </div>

        <div className={mobileDescriptionWrapper}>
          <Body
            type="large"
            weight={600}
            color={COLORS.gray[700]}
            style={{ textAlign: "center" }}
          >
            페이지를 찾을 수 없습니다 <br />
            요청하신 페이지가 존재하지 않거나 <br />
            이동되었을 수 있습니다.
          </Body>
          <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
            URL을 확인하거나 아래 버튼을 이용해주세요.
          </Body>
        </div>

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
