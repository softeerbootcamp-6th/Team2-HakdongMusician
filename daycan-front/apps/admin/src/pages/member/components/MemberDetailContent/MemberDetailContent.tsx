import { Body, COLORS, Heading } from "@daycan/ui";
import { DetailCardLayout } from "../DetailCardLayout/DetailCardLayout";
import memberImage from "@/assets/images/elder.png";
import type { MemberData } from "@/types/member";
import {
  memberDetailContainer,
  memberDetailContentContainer,
  memberDetailContentItemContainer,
} from "./MemberDetailContent.css";

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
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              성별
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              생년월일
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              장기요양등급
            </Body>
            <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
              장기요양인정번호
            </Body>
          </div>
          <div className={memberDetailContentItemContainer}>
            <Body type="xsmall" weight={500}>
              {member.gender}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.birthDate}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.careLevel}
            </Body>
            <Body type="xsmall" weight={500}>
              {member.organizationId}
            </Body>
          </div>
        </div>
      </div>
    </DetailCardLayout>
  );
};
