import { Body, Heading } from "@daycan/ui";
import type { ElderInfo, Guardian } from "@/types/elder.ts";
import {
  dataSectionCardContainer,
  dataSectionCard,
  dataSectionCardInfo,
  dataSectionCardInfoContainer,
} from "./DataSectionCard.css.ts";
import guardianImage from "@/assets/images/guardian.png";
import elderImage from "@/assets/images/elder.png";

interface DataSectionCardProps {
  type: "member" | "guardian";
  memberInfo?: ElderInfo;
  guardianInfo?: Guardian;
}

export const DataSectionCard = ({
  type,
  memberInfo,
  guardianInfo,
}: DataSectionCardProps) => {
  if (type === "member" && memberInfo) {
    return (
      <div className={dataSectionCardContainer}>
        <Body type="small">수급자 정보</Body>
        <div className={dataSectionCard}>
          {memberInfo.profileImage && (
            <img
              // src={memberInfo.profileImage}
              src={elderImage}
              alt={`${memberInfo.name} 프로필`}
              style={{
                width: "90px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
          <div className={dataSectionCardInfoContainer}>
            <div>
              <Heading type="small" weight={600}>
                {memberInfo.name}
              </Heading>
            </div>
            <div className={dataSectionCardInfo}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Body type="medium">성별</Body>
                <Body type="medium">생년월일</Body>
                <Body type="medium">장기요양등급</Body>
                <Body type="medium">장기요양인정번호</Body>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Body type="medium">{memberInfo.gender}</Body>
                <Body type="medium">{memberInfo.birthDate}</Body>
                <Body type="medium">{memberInfo.careLevel}</Body>
                <Body type="medium">{memberInfo.careNumber}</Body>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "guardian" && guardianInfo) {
    return (
      <div className={dataSectionCardContainer}>
        <Body type="small">보호자 정보</Body>
        <div className={dataSectionCard}>
          {guardianInfo.avatarUrl && (
            <img
              // src={guardianInfo.avatarUrl}
              src={guardianImage}
              alt={`${guardianInfo.name} 프로필`}
              style={{
                width: "90px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
          <div className={dataSectionCardInfoContainer}>
            <div>
              <Heading type="small" weight={600}>
                {guardianInfo.name}
              </Heading>
            </div>
            <div className={dataSectionCardInfo}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Body type="medium">관계</Body>
                <Body type="medium">생년월일</Body>
                <Body type="medium">연락처</Body>
                <Body type="medium">리포트 수신 여부</Body>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Body type="medium">{guardianInfo.relation}</Body>
                <Body type="medium">{guardianInfo.birthDate}</Body>
                <Body type="medium">{guardianInfo.phoneNumber}</Body>
                <Body type="medium">
                  {guardianInfo.isSubscribed ? "수신 중" : "미수신"}
                </Body>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>정보를 불러올 수 없습니다.</div>;
};
