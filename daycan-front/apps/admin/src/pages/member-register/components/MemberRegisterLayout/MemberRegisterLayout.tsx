import { Body, Heading, Icon, COLORS, Button } from "@daycan/ui";
import {
  memberRegisterLayoutContainer,
  memberRegisterLayoutHeader,
  memberRegisterLayoutHeaderTitle,
  memberRegisterLayoutHeaderDescription,
  memberRegisterLayoutContent,
  memberRegisterPageButtonContainer,
} from "./MemberRegisterLayout.css";

interface MemberRegisterLayoutProps {
  mode: "register" | "edit";
  children: React.ReactNode;
  isFormReadyForSubmission: boolean;
  handleFormSubmit: () => void;
}

/*
 * 수급자 등록 레이아웃
 */
export const MemberRegisterLayout = ({
  mode,
  children,
  isFormReadyForSubmission,
  handleFormSubmit,
}: MemberRegisterLayoutProps) => {
  return (
    <div className={memberRegisterLayoutContainer}>
      {/* 헤더 */}
      <div className={memberRegisterLayoutHeader}>
        <div className={memberRegisterLayoutHeaderTitle}>
          <Heading>수급자 관리</Heading>
          <Icon
            name="arrowRight"
            width={24}
            height={24}
            color={COLORS.gray[50]}
            stroke={COLORS.gray[700]}
          />
          <Heading>
            {mode === "register" ? "수급자 등록" : "수급자 수정"}
          </Heading>
        </div>

        <div className={memberRegisterLayoutHeaderDescription}>
          <Body>빠짐없이 작성해 주세요.</Body>
        </div>
      </div>

      {/* 컨텐츠: 수급자 정보, 보호자 정보, 리포트 수신 여부 */}
      <div className={memberRegisterLayoutContent}>{children}</div>

      {/* 버튼 */}
      <div className={memberRegisterPageButtonContainer}>
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
