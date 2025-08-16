import { DetailCardLayout } from "../DetailCardLayout/DetailCardLayout";
import guardianImage from "@/assets/images/guardian.png";
import type { MemberData } from "../../constants/member";
import { Heading } from "@daycan/ui";
import {
  guardianDetailContainer,
  guardianDetailContentContainer,
  guardianDetailContentItemContainer,
} from "./GuardianDetailContent.css";
import { MemberDetailItemRow } from "../MemberDetailItemRow/MemberDetailItemRow";

interface GuardianDetailContentProps {
  member: MemberData;
}

export const GuardianDetailContent = ({
  member,
}: GuardianDetailContentProps) => {
  return (
    <DetailCardLayout dataCategory="보호자 정보" dataAvatarUrl={guardianImage}>
      <div className={guardianDetailContainer}>
        <Heading type="xsmall" weight={500}>
          {member.guardianName}
        </Heading>
        <div className={guardianDetailContentContainer}>
          <div className={guardianDetailContentItemContainer}>
            <MemberDetailItemRow
              label="생년월일"
              value={member.guardianRelationBirthDate}
            />
            <MemberDetailItemRow
              label="연락처"
              value={member.guardianPhoneNumber}
            />
            <MemberDetailItemRow
              label="고령자와의 관계"
              value={member.guardianRelation}
            />
            <MemberDetailItemRow
              label="비밀번호"
              value={member.organizationId}
            />
            <MemberDetailItemRow
              label="리포트 수신 여부"
              value={member.acceptReport ? "수신" : "미수신"}
            />
          </div>
        </div>
      </div>
    </DetailCardLayout>
  );
};
