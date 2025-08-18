import { MemberListItem } from "../MemberListItem/MemberListItem";
import { memberListContainer } from "./MemberList.css";
import type { Member } from "./types";

interface MemberListProps {
  members: Member[];
  selectedMemberId?: number;
  onMemberSelect?: (member: Member) => void;
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
          code={member.code}
          profileImage={member.profileImage}
          isSelected={selectedMemberId === member.id}
          onClick={() => onMemberSelect?.(member)}
        />
      ))}
    </div>
  );
};
