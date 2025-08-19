import { MemberDataItemDetail } from "../MemberDataItemDetail/index.ts";
import { MemberDetailContent } from "../MemberDetailContent/index.ts";
import { GuardianDetailContent } from "../GuardianDetailContent/index.ts";
import { Chip, Body, COLORS } from "@daycan/ui";
import {
  formatBirthDate,
  formatGender,
  formatCareGrade,
} from "@/utils/index.ts";
import { profileImage } from "./MemberDataItem.css.ts";
import profileImg from "@/assets/images/profile.png";
import type { TMember } from "@/services/member/types";
import { useState } from "react";
import { ListItemLayout } from "@/components/ListItemLayout/ListItemLayout.tsx";
import { MEMBER_GRID_TEMPLATE } from "../../constants/memberGrid";

interface MemberDataItemProps {
  member: TMember;
  index: number;
}

export const MemberDataItem = ({ member, index }: MemberDataItemProps) => {
  // 상세보기 상태
  const [isExpanded, setIsExpanded] = useState(false);

  // 상세보기 토글 핸들러
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const columns = [
    {
      key: "order",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {index + 1}
        </Body>
      ),
    },
    {
      key: "profile",
      content: (
        <img
          src={member.avatarUrl || profileImg}
          alt="프로필"
          className={profileImage}
        />
      ),
    },

    {
      key: "name",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {member.name || "-"}
        </Body>
      ),
    },
    {
      key: "birthDate",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {formatBirthDate(member.birthDate) || "-"}
        </Body>
      ),
    },
    {
      key: "gender",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {formatGender(member.gender) || "-"}
        </Body>
      ),
    },
    {
      key: "careLevel",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {formatCareGrade(member.careLevel) || "-"}
        </Body>
      ),
    },
    {
      key: "username",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {member.careNumber || "-"}
        </Body>
      ),
    },
    {
      key: "guardianPhone",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {member.guardianPhoneNumber || "-"}
        </Body>
      ),
    },
    {
      key: "more",
      content: (
        <Chip
          color="grayLight"
          round="s"
          style={{ padding: "2px 6px", cursor: "pointer", width: "61px" }}
          onClick={toggleExpanded}
        >
          <Body type="xsmall" weight={500} color={COLORS.gray[700]}>
            {isExpanded ? "닫기" : "상세보기"}
          </Body>
        </Chip>
      ),
    },
  ];

  return (
    <>
      <ListItemLayout columns={columns} gridTemplate={MEMBER_GRID_TEMPLATE} />
      {/* 상세보기시 등장하는 컴포넌트 */}
      {isExpanded && (
        <MemberDataItemDetail memberId={member.id} member={member}>
          <MemberDetailContent member={member} />
          <GuardianDetailContent member={member} />
        </MemberDataItemDetail>
      )}
    </>
  );
};
