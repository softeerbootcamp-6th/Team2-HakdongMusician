import { Body, COLORS, Heading } from "@daycan/ui";
import {
  dataSectionCardContainer,
  dataSectionCard,
  dataSectionCardInfo,
  dataSectionCardInfoContainer,
  memberAvatar,
  Container,
  infoColumn,
} from "./MemberDataSectionCard.css.ts";
import guardianImage from "@/assets/images/guardian.png";
import elderImage from "@/assets/images/elder.png";

interface MemberDataSectionCardProps {
  memberData: any;
}

export const MemberDataSectionCard = ({
  memberData,
}: MemberDataSectionCardProps) => {
  return (
    <div className={Container}>
      <div className={dataSectionCardContainer}>
        <Body type="small">수급자 정보</Body>
        <div className={dataSectionCard}>
          {memberData.avatarUrl && (
            <img
              // src={memberInfo.avatarUrl}
              src={elderImage}
              alt={`${memberData.name} 프로필`}
              className={memberAvatar}
            />
          )}
          <div className={dataSectionCardInfoContainer}>
            <div>
              <Heading type="small" weight={600}>
                {memberData.name}
              </Heading>
            </div>
            <div className={dataSectionCardInfo}>
              <div className={infoColumn}>
                <Body type="medium" color={COLORS.gray[500]}>
                  성별
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  생년월일
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  장기요양등급
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  장기요양인정번호
                </Body>
              </div>
              <div className={infoColumn}>
                <Body type="medium">{memberData.gender}</Body>
                <Body type="medium">{memberData.birthDate}</Body>
                <Body type="medium">{memberData.careLevel}</Body>
                <Body type="medium">{memberData.careNumber}</Body>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={dataSectionCardContainer}>
        <Body type="small">보호자 정보</Body>
        <div className={dataSectionCard}>
          {memberData.guardianAvatarUrl && (
            <img
              // src={guardianInfo.avatarUrl}
              src={guardianImage}
              alt={`${memberData.guardianName} 프로필`}
              className={memberAvatar}
            />
          )}
          <div className={dataSectionCardInfoContainer}>
            <div>
              <Heading type="small" weight={600}>
                {memberData.guardianName}
              </Heading>
            </div>
            <div className={dataSectionCardInfo}>
              <div className={infoColumn}>
                <Body type="medium" color={COLORS.gray[500]}>
                  관계
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  생년월일
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  연락처
                </Body>
                <Body type="medium" color={COLORS.gray[500]}>
                  리포트 수신 여부
                </Body>
              </div>
              <div className={infoColumn}>
                <Body type="medium">{memberData.guardianRelation}</Body>
                <Body type="medium">
                  {memberData.guardianRelationBirthDate}
                </Body>
                <Body type="medium">{memberData.guardianPhoneNumber}</Body>
                <Body type="medium">
                  {memberData.isSubscribed ? "동의" : "미동의"}
                </Body>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
