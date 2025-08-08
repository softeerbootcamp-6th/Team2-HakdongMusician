import { DetailCardLayout } from "../DetailCardLayout/DetailCardLayout";
import guardianImage from "@/assets/images/guardian.png";
import type { MemberData } from "@/types";
import { Body, COLORS, Heading } from "@daycan/ui";
import {
  guardianDetailCardContainer,
  guardianDetailCardContentContainer,
  guardianDetailCardContentItemContainer,
} from "./GuardianDetailCard.css";

interface GuardianDetailCardProps {
  member: MemberData;
}

export const GuardianDetailCard = ({ member }: GuardianDetailCardProps) => {
  return (
    <DetailCardLayout dataCategory="보호자 정보" dataAvatarUrl={guardianImage}>
      <div className={guardianDetailCardContainer}>
        <Heading type="small" weight={500}>
          {member.guardianName}
        </Heading>
        <div className={guardianDetailCardContentContainer}>
          <div className={guardianDetailCardContentItemContainer}>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              생년월일
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              연락처
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              고령자와의 관계
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              비밀번호
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              리포트 수신 여부
            </Body>
          </div>
          <div className={guardianDetailCardContentItemContainer}>
            <Body type="xsmall" weight={500}>
              {member.guardianRelationBirthDate}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.guardianPhoneNumber}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.guardianRelation}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.guardianPhoneNumber}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.acceptReport ? "수신" : "미수신"}
            </Body>
          </div>
        </div>
      </div>
    </DetailCardLayout>
  );
};
