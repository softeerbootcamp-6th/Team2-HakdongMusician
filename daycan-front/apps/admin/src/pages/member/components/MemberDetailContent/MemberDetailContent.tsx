import { Heading } from "@daycan/ui";
import { DetailCardLayout } from "../DetailCardLayout/DetailCardLayout";
import memberImage from "@/assets/images/elder.png";
import type { MemberData } from "@/pages/member/constants/member";
import {
  memberDetailContainer,
  memberDetailContentContainer,
  memberDetailContentItemContainer,
} from "./MemberDetailContent.css";
import { MemberDetailItemRow } from "../MemberDetailItemRow";
import { formatBirthDate, formatGender } from "@/utils/util";

interface MemberDetailContentProps {
  member: MemberData;
}

export const MemberDetailContent = ({ member }: MemberDetailContentProps) => {
  return (
    <DetailCardLayout dataCategory="수급자 정보" dataAvatarUrl={memberImage}>
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
              value={member.careLevel.toString()}
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
