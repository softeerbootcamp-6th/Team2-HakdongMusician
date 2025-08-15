import { Heading } from "@daycan/ui";
import {
  staffInfoSectionContainer,
  staffInfoSectionContent,
} from "./StaffInfoSection.css";

interface StaffInfoSectionProps {
  children: React.ReactNode;
}

export const StaffInfoSection = ({ children }: StaffInfoSectionProps) => {
  return (
    <div className={staffInfoSectionContainer}>
      <Heading>종사자 정보</Heading>
      <div className={staffInfoSectionContent}>{children}</div>
    </div>
  );
};
