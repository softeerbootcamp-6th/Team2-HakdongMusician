import { Body, Heading, Icon, COLORS, Button } from "@daycan/ui";
import {
  staffRegisterLayoutContainer,
  staffRegisterLayoutHeader,
  staffRegisterLayoutHeaderTitle,
  staffRegisterLayoutHeaderDescription,
  staffRegisterLayoutContent,
  staffRegisterPageButtonContainer,
} from "./StaffRegisterLayout.css";

interface StaffRegisterLayoutProps {
  mode: "register" | "edit";
  children: React.ReactNode;
  isFormReadyForSubmission: boolean;
  handleFormSubmit: () => void;
}

/*
 * 종사자 등록 레이아웃
 */
export const StaffRegisterLayout = ({
  mode,
  children,
  isFormReadyForSubmission,
  handleFormSubmit,
}: StaffRegisterLayoutProps) => {
  return (
    <div className={staffRegisterLayoutContainer}>
      {/* 헤더 */}
      <div className={staffRegisterLayoutHeader}>
        <div className={staffRegisterLayoutHeaderTitle}>
          <Heading>종사자 관리</Heading>
          <Icon
            name="arrowRight"
            width={24}
            height={24}
            color={COLORS.gray[50]}
            stroke={COLORS.gray[700]}
          />
          <Heading>
            {mode === "register" ? "종사자 등록" : "종사자 수정"}
          </Heading>
        </div>

        <div className={staffRegisterLayoutHeaderDescription}>
          <Body>빠짐없이 작성해 주세요.</Body>
        </div>
      </div>

      {/* 컨텐츠: 종사자 정보, 이미지, 폼 */}
      <div className={staffRegisterLayoutContent}>{children}</div>

      {/* 버튼 */}
      <div className={staffRegisterPageButtonContainer}>
        <Button
          size="large"
          disabled={!isFormReadyForSubmission}
          onClick={handleFormSubmit}
          style={{
            backgroundColor: isFormReadyForSubmission
              ? COLORS.primary[300]
              : COLORS.gray[400],
            cursor: isFormReadyForSubmission ? "pointer" : "not-allowed",
            opacity: isFormReadyForSubmission ? 1 : 0.6,
          }}
        >
          <Body type="medium" weight={600} color={COLORS.gray[600]}>
            {mode === "register" ? "등록" : "수정"}
          </Body>
        </Button>
      </div>
    </div>
  );
};
