import { Body, COLORS } from "@daycan/ui";
import { diagnosisCardLayout } from "./DiagnosisCardLayout.css";

interface DiagnosisCardLayoutProps {
  title: string;
  children: React.ReactNode;
  isRequired?: boolean;
}

export const DiagnosisCardLayout = ({
  title,
  children,
  isRequired,
}: DiagnosisCardLayoutProps) => {
  return (
    <div className={diagnosisCardLayout}>
      <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
        {title}
        {isRequired && <span style={{ color: COLORS.red[500] }}>*</span>}
      </Body>
      {children}
    </div>
  );
};
