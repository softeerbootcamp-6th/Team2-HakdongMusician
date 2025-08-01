import { COLORS, Heading } from "@daycan/ui";
import { greeting } from "./Greeting.css";
import envelopeImage from "@/assets/png/envelope.png";
import openedEnvelopeImage from "@/assets/png/envelope_opened.png";
import { HighlightingHeading } from "@/components/HighlightingHeading";
import { useNavigate } from "react-router-dom";
interface GreetingProps {
  parentName: string;
  isReportArrived: boolean;
}

export const Greeting = ({ parentName, isReportArrived }: GreetingProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={greeting}
      style={{
        backgroundImage: `url(${isReportArrived ? envelopeImage : openedEnvelopeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => {
        if (isReportArrived) {
          navigate("/to-report");
        }
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <HighlightingHeading text={parentName} />
        <Heading type="medium" weight={400} color={COLORS.gray[600]}>
          보호자님!
        </Heading>
      </div>
      <Heading type="medium" weight={400} color={COLORS.gray[600]}>
        {isReportArrived ? "리포트가 도착했어요!" : "리포트를 확인했어요!"}
      </Heading>
    </div>
  );
};
