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
import type { TMember } from "@/services/member/types";
import { useState, useRef, useEffect } from "react";
import { ListItemLayout } from "@/components/ListItemLayout/ListItemLayout.tsx";
import { MEMBER_GRID_TEMPLATE } from "../../constants/memberGrid";

interface MemberDataItemProps {
  member: TMember;
  index: number;
}

export const MemberDataItem = ({ member, index }: MemberDataItemProps) => {
  // 상세보기 상태
  const [isExpanded, setIsExpanded] = useState(false);

  // 상세 내용에 대한 ref
  const detailRef = useRef<HTMLDivElement>(null);

  // 상세보기 토글 핸들러
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // 상세보기가 열릴 때 자동으로 스크롤하고 focus
  useEffect(() => {
    if (isExpanded && detailRef.current) {
      // 부드러운 스크롤로 상세 내용으로 이동
      detailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      // 약간의 지연 후 focus 설정 (스크롤 완료 후)
      setTimeout(() => {
        if (detailRef.current) {
          detailRef.current.focus();
        }
      }, 300);
    }
  }, [isExpanded]);

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
          src={member.avatarUrl || "/src/assets/images/emptyProfile.png"}
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
          {member.careLevel === 6
            ? "인지지원"
            : formatCareGrade(member.careLevel)}
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
        <div ref={detailRef} tabIndex={-1} style={{ outline: "none" }}>
          <MemberDataItemDetail memberId={member.id} member={member}>
            <MemberDetailContent member={member} />
            <GuardianDetailContent member={member} />
          </MemberDataItemDetail>
        </div>
      )}
    </>
  );
};
