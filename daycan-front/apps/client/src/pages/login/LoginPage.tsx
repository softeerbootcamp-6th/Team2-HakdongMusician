import { Button, Heading, Body, Icon, COLORS } from "@daycan/ui";
import {
  container,
  header,
  inputGroup,
  optionsContainer,
  checkboxContainer,
  forgotPassword,
  footer,
  footerLink,
  customInput,
  formContainer,
} from "./LoginPage.css";
import { useLoginHook } from "./hooks";
import { ForgotCredentialsModal } from "./components";

export const LoginPage = () => {
  const {
    isFilled,
    password,
    id,
    handleIdChange,
    handlePasswordChange,
    errorMessage,
    handleLogin,
    isChecked,
    setIsChecked,
    isModalOpen,
    setIsModalOpen,
    resetForm,
  } = useLoginHook();

  return (
    <div className={container}>
      {/* 헤더 */}
      <div className={header}>
        <Icon name="fullLogo40" width={128} height={32} />
        <Heading type="large" weight={600}>
          보호자 로그인
        </Heading>
      </div>

      {/* 폼 */}
      <form className={formContainer} onSubmit={handleLogin}>
        {/* 장기요양인정번호 입력 */}
        <div className={inputGroup}>
          <input
            className={customInput}
            placeholder="장기요양인정번호"
            type="text"
            value={id}
            onChange={handleIdChange}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className={inputGroup}>
          <input
            className={customInput}
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && (
          <Body type="small" weight={400} color={COLORS.red[500]}>
            {errorMessage}
          </Body>
        )}

        {/* 로그인 버튼 */}
        <Button
          size="fullWidth"
          variant={isFilled ? "primary" : "unEmphasized"}
        >
          로그인
        </Button>

        {/* 옵션들 */}
        <div className={optionsContainer}>
          <div
            className={checkboxContainer}
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked ? (
              <Icon
                name="circleCheck"
                width={16}
                height={16}
                color={COLORS.gray[900]}
                stroke={COLORS.white}
              />
            ) : (
              <Icon
                name="circleCheck"
                width={16}
                height={16}
                color={COLORS.gray[100]}
              />
            )}
            <label htmlFor="keepLogin">로그인 상태 유지</label>
          </div>
          <a
            href="#"
            className={forgotPassword}
            onClick={() => setIsModalOpen(true)}
          >
            {`로그인 정보를 잊으셨나요? >`}
          </a>
        </div>
      </form>

      {/* 푸터 */}
      <div className={footer}>
        <Body type="small" weight={500} color={COLORS.gray[500]}>
          혹시 센터종사자신가요?
        </Body>

        <a href="#" className={footerLink}>
          센터 로그인 바로가기
        </a>
      </div>

      <ForgotCredentialsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
      />
    </div>
  );
};
