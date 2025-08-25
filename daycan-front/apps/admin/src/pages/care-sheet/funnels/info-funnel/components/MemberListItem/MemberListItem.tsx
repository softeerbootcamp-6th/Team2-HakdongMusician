import { Body, COLORS } from "@daycan/ui";
import {
  memberListItemContainer,
  memberListItemProfile,
  memberListItemInfo,
  memberListItemCode,
} from "./MemberListItem.css";

interface MemberListItemProps {
  memberId: number;
  name: string;
  birthDate: string;
  profileImage?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const MemberListItem = ({
  memberId,
  name,
  birthDate,
  profileImage,
  isSelected = false,
  onClick,
}: MemberListItemProps) => {
  return (
    <div className={memberListItemContainer} onClick={onClick}>
      <div className={memberListItemProfile}>
        <img
          src={profileImage || "/default-profile.png"}
          alt={name}
          width={32}
          height={32}
        />
      </div>
      <div className={memberListItemInfo}>
        <Body type="medium" weight={500} color={COLORS.gray[900]}>
          {name}
        </Body>
      </div>
      <Body type="small" weight={400} color={COLORS.gray[600]}>
        {birthDate}
      </Body>
      <div className={memberListItemCode({ isSelected })}>
        <Body type="small" weight={500}>
          {memberId}
        </Body>
      </div>
    </div>
  );
};
