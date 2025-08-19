import { Heading } from "@daycan/ui";
import { DetailCardLayout } from "../DetailCardLayout/DetailCardLayout";
import type { TMember } from "@/services/member/types";
import {
  memberDetailContainer,
  memberDetailContentContainer,
  memberDetailContentItemContainer,
} from "./MemberDetailContent.css";
import { MemberDetailItemRow } from "../MemberDetailItemRow";
import { formatBirthDate, formatGender } from "@/utils/util";

interface MemberDetailContentProps {
  member: TMember;
}

export const MemberDetailContent = ({ member }: MemberDetailContentProps) => {
  return (
    <DetailCardLayout
      dataCategory="수급자 정보"
      dataAvatarUrl={member.avatarUrl || ""}
    >
      <div className={memberDetailContainer}>
        <Heading type="xsmall" weight={500}>
          {member.name}
        </Heading>
        <div className={memberDetailContentContainer}>
          <div className={memberDetailContentItemContainer}>
            <MemberDetailItemRow
              label="성별"
              value={formatGender(member.gender)}
            />
            <MemberDetailItemRow
              label="생년월일"
              value={formatBirthDate(member.birthDate)}
            />
            <MemberDetailItemRow
              label="장기요양등급"
              value={member.careLevel}
            />
            <MemberDetailItemRow
              label="장기요양인정번호"
              value={member.organizationId}
            />
          </div>
        </div>
      </div>
    </DetailCardLayout>
  );
};
