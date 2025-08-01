import { Body, Heading, LottieAnimation } from "@daycan/ui";
import {
  container,
  animationContainer,
  textContainer,
} from "./ToReportPage.css";
import envelopeOpeningAnimation from "@/assets/animations/envelope-opening-final.json";
import { useToReportHook } from "./hooks";

export const ToReportPage = () => {
  const { handleAnimationComplete } = useToReportHook();

  return (
    <div className={container}>
      <div className={animationContainer}>
        <LottieAnimation
          animationData={envelopeOpeningAnimation}
          width={"100%"}
          height={"100%"}
          loop={false}
          autoplay={true}
          speed={0.8}
          onComplete={handleAnimationComplete}
        />
      </div>

      <div className={textContainer}>
        <Heading type="xsmall">리포트 생성 중...</Heading>
        <Body type="small">잠시만 기다려주세요</Body>
      </div>
    </div>
  );
};
