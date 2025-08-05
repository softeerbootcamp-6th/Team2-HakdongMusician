import { ReportsHeader } from "./components/ReportsHeader/ReportsHeader";
import { ReportsContent } from "./components/ReportsContent/ReportsContent";
import { reportsPageContainer } from "./ReportsPage.css";

export const ReportsPage = () => {
  return (
    <div className={reportsPageContainer}>
      <ReportsHeader />
      <ReportsContent />
    </div>
  );
};
