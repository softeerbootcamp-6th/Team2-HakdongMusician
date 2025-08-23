import { Body, Button, Heading, Modal, COLORS } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks";
import {
  container,
  successIcon,
  buttonGroup,
} from "./AdminLoginRouteModal.css";

interface AdminLoginRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginRouteModal = ({
  isOpen,
  onClose,
}: AdminLoginRouteModalProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleCenterStaffLogin = () => {
    navigate("/care-sheet/new");
    onClose(); // 모달 닫기
  };

  const handleAdminLogin = () => {
    // 모바일에서는 PC 페이지로 접근하지 못하도록 제한
    if (isMobile) {
      return; // 모바일에서는 아무 동작 안함
    }
    navigate("/"); // 또는 원하는 관리자 페이지 경로
    onClose(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={container}>
        {/* 성공 아이콘 */}
        <div className={successIcon}>
          {/* 제목 */}
          <Heading type="medium" weight={600} color={COLORS.green[500]}>
            로그인 성공!
          </Heading>
        </div>

        {/* 설명 */}
        <Body type="medium" weight={500}>
          환영합니다! 어떤 페이지로 이동하시겠습니까?
        </Body>

        {/* 모바일 안내 메시지 */}
        {isMobile && (
          <Body
            type="small"
            weight={400}
            style={{ color: COLORS.gray[500], textAlign: "center" }}
          >
            모바일에서는 센터 종사자 페이지만 이용 가능합니다.
          </Body>
        )}

        {/* 버튼 그룹 */}
        <div className={buttonGroup}>
          <Button
            onClick={handleCenterStaffLogin}
            variant="primary"
            size="fullWidth"
          >
            센터 종사자 페이지
          </Button>

          <Button
            onClick={handleAdminLogin}
            variant="unEmphasized"
            size="fullWidth"
            disabled={isMobile}
          >
            {isMobile ? "모바일에서는 접근 불가" : "관리자 페이지"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
