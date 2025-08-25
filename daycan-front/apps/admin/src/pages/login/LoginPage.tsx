import { Body, Heading, Icon, COLORS, Button, Input } from "@daycan/ui";
import {
  loginContainer,
  loginCard,
  form,
  inputGroup,
  forgotPassword,
  AreYouGuest,
  loginHeader,
  checkContainer,
  headerContent,
  subDescription,
} from "./LoginPage.css";
import { useAdminLoginHook } from "./hooks";
import { ForgotCredentialsModal } from "./components/ForgotCredentialsModal";
import { AdminLoginRouteModal } from "./components/AdminLoginRouteModal/AdminLoginRouteModal";
export const LoginPage = () => {
  const {
    isFilled,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    errorMessage,
    handleLogin,
    isChecked,
    setIsChecked,
    isModalOpen,
    setIsModalOpen,
    isAdminLoginRouteModalOpen,
    setIsAdminLoginRouteModalOpen,
    resetForm,
  } = useAdminLoginHook();

  return (
    // 전체 로그인 페이지 컨테이너
    <div className={loginContainer}>
      {/* 로그인 카드 */}
      <div className={loginCard}>
        <div className={loginHeader}>
          <Icon name="fullLogo40" width={166} height={40} />
          <div className={headerContent}>
            <Heading
              type="large"
              weight={700}
              style={{ color: COLORS.gray[800] }}
            >
              센터종사자 로그인
            </Heading>
            <Body type="small" weight={400} className={subDescription}>
              어떻게 치매까지 사랑하겠어, 엄마를 사랑하는 거지...
            </Body>
          </div>
        </div>

        {/* 로그인 폼 */}
        <form className={form} onSubmit={handleLogin}>
          <div className={inputGroup}>
            <Input
              type="text"
              variant="grayLight"
              inputSize="full"
              placeholder="아이디"
              color="grayLight"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className={inputGroup}>
            <Input
              type="password"
              variant="grayLight"
              inputSize="full"
              placeholder="비밀번호"
              color="grayLight"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {errorMessage && (
            <Body type="small" weight={400} style={{ color: COLORS.red[500] }}>
              {errorMessage}
            </Body>
          )}

          <Button
            variant={isFilled ? "primary" : "unEmphasized"}
            size="fullWidth"
            style={{ marginTop: "12px" }}
          >
            로그인
          </Button>
        </form>

        {/* 체크박스 및 링크 */}
        <div className={checkContainer}>
          <div
            className={forgotPassword}
            onClick={() => setIsChecked(!isChecked)}
          >
            <Icon
              name="circleCheck"
              width={16}
              height={16}
              color={isChecked ? COLORS.gray[900] : COLORS.gray[100]}
              stroke={COLORS.white}
            />
            <Body type="small" weight={400} style={{ color: COLORS.gray[700] }}>
              로그인 상태 유지
            </Body>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Body type="small" weight={400} style={{ color: COLORS.gray[700] }}>
              아이디・비밀번호 찾기
            </Body>
          </div>
        </div>

        {/* 보호자 로그인 안내 */}
        <div className={AreYouGuest}>
          <Body type="small" weight={400} style={{ color: COLORS.gray[700] }}>
            혹시 보호자이신가요?
          </Body>
          <Body
            type="small"
            weight={400}
            style={{ color: COLORS.primary[300] }}
          >
            <a
              href="https://www.daycan.kr/login"
              style={{ color: COLORS.gray[800], textDecoration: "underline" }}
            >
              보호자 로그인 바로가기
            </a>
          </Body>
        </div>
      </div>

      {/* 계정 정보 찾기 모달 */}
      <ForgotCredentialsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
      />

      <AdminLoginRouteModal
        isOpen={isAdminLoginRouteModalOpen}
        onClose={() => setIsAdminLoginRouteModalOpen(false)}
      />
    </div>
  );
};
