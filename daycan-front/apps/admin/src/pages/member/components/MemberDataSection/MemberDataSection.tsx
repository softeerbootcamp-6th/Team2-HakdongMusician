import { DataSection } from "@/components/DataSection";
import { MemberDataSectionCard } from "../MemberDataSectionCard";
import type { AdminMemberAndGuardianResponse } from "@/types/member";

interface MemberDataSectionProps {
  memberData: AdminMemberAndGuardianResponse;
}
export const MemberDataSection = ({ memberData }: MemberDataSectionProps) => {
  const children = <MemberDataSectionCard memberData={memberData} />;
  return <DataSection dataSectionCard={children} />;
};
