import { Header } from "../Header/Header";
import { diagnosisFunnelLayout } from "./DiagnosisLayout.css";

interface DiagnosisLayoutProps {
  children: React.ReactNode;
  title: string;
  nextTitle?: string;
}

export const DiagnosisLayout = ({
  children,
  title,
  nextTitle,
}: DiagnosisLayoutProps) => {
  return (
    <div className={diagnosisFunnelLayout}>
      <Header title={title} nextTitle={nextTitle || ""} />
      {children}
    </div>
  );
};
