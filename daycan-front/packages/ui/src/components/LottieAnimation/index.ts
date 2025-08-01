/**
 * 로티 에니메이션을 쉽게 사용할 수 있도록 하는 컴포넌트
 * json 파일을 입력하면 자동으로 애니메이션이 재생되도록 함
 * loop, autoplay, speed, onComplete 등의 옵션을 제공함
 * 사용 예시
 * <LottieAnimation
 *   animationData={envelopeOpeningAnimation}
 *   width={"100%"}
 *   height={"100%"}
 *   loop={false}
 *   autoplay={true}
 *   speed={0.8}
 *   onComplete={handleAnimationComplete}
 * />
 * @author 홍규진
 */

export { LottieAnimation } from "./LottieAnimation";
