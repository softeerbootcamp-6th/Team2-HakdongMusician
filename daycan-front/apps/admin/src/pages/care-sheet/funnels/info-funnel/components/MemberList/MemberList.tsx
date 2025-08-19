import type { TMember } from "@/services/member/types";
import { MemberListItem } from "../MemberListItem/MemberListItem";
import { memberListContainer } from "./MemberList.css";

interface MemberListProps {
  members: TMember[];
  selectedMemberId?: number;
  onMemberSelect?: (member: TMember) => void;
}

export const MemberList = ({
  members,
  selectedMemberId,
  onMemberSelect,
}: MemberListProps) => {
  return (
    <div className={memberListContainer}>
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          name={member.name}
          birthDate={member.birthDate}
          code={member.id}
          profileImage={member.avatarUrl}
          isSelected={selectedMemberId === member.id}
          onClick={() => onMemberSelect?.(member)}
        />
      ))}
    </div>
  );
};
