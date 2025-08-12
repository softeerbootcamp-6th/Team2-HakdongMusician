import { memberDataListContainer } from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { MemberDataItems } from "../MemberDataItems/index.ts";
import { useMember } from "../../hooks/index.ts";

interface MemberDataListProps {
  onEditClick: (memberId: string) => void;
}

export const MemberDataList = ({ onEditClick }: MemberDataListProps) => {
  const { members } = useMember();
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />
      <MemberDataItems members={members as any} onEditClick={onEditClick} />
    </div>
  );
};
