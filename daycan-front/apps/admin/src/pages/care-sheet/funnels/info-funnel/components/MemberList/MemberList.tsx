import type { TUnWrittenMember } from "@/services/member/types";
import { MemberListItem } from "../MemberListItem/MemberListItem";
import { memberListContainer } from "./MemberList.css";

interface MemberListProps {
  members: TUnWrittenMember[];
  selectedMemberId?: number;
  onMemberSelect?: (member: TUnWrittenMember) => void;
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
          key={member.memberId}
          memberId={member.memberId}
          name={member.name}
          birthDate={member.birthDate}
          profileImage={member.avatarUrl}
          isSelected={selectedMemberId === member.memberId}
          onClick={() => onMemberSelect?.(member)}
        />
      ))}
    </div>
  );
};
