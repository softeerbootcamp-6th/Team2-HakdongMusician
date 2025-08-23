import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks";
import { useToast } from "@daycan/ui";

interface MobileAccessGuardProps {
  children: React.ReactNode;
}

export const MobileAccessGuard = ({ children }: MobileAccessGuardProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (isMobile) {
      // 모바일에서는 care-sheet/new로 리다이렉트
      showToast({
        data: {
          message: "모바일에서는 센터 종사자 페이지만 이용 가능합니다.",
          type: "error",
          variant: "pc",
        },
      });
      navigate("/care-sheet/new");
    }
  }, [isMobile, navigate]);

  return <>{children}</>;
};
