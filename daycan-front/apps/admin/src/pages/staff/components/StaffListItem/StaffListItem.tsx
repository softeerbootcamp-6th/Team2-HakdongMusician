import { Body, Chip, COLORS } from "@daycan/ui";
import { profileImage } from "./StaffListItem.css";
import {
  colorByStaffRole,
  formatBirthDate,
  formatGender,
  formatStaffRole,
} from "@/utils";
import { useState, useRef, useEffect } from "react";
import { StaffDetailContent } from "../StaffDetailContent";
import { ListItemLayout } from "@/components";
import { STAFF_GRID_TEMPLATE } from "../../constants/staffGrid";
import type { TStaff } from "@/services/staff/types";

interface StaffListItemProps {
  staff: TStaff;
  index: number;
}
export const StaffListItem = ({ staff, index }: StaffListItemProps) => {
  //상세보기 상태
  const [isExpanded, setIsExpanded] = useState(false);

  // 상세 내용에 대한 ref
  const detailRef = useRef<HTMLDivElement>(null);

  //상세보기 토글 핸들러
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

  //컬러 지정
  const colorStaffRole = colorByStaffRole(staff.staffRole);

  //chip 내부 Body 색상 지정
  const bodyColorStaffRole = (color: string) => {
    switch (color) {
      case "yellow":
        return COLORS.yellow[500];
      case "green":
        return COLORS.green[500];
      case "blue":
        return COLORS.blue[500];
      default:
        return COLORS.gray[800];
    }
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
          src={staff.avatarUrl || "/src/assets/images/emptyProfile.png"}
          alt="avatar"
          className={profileImage}
        />
      ),
    },

    {
      key: "name",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {staff.name}
        </Body>
      ),
    },
    {
      key: "birthDate",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {formatBirthDate(staff.birthDate)}
        </Body>
      ),
    },
    {
      key: "gender",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {formatGender(staff.gender)}
        </Body>
      ),
    },
    {
      key: "phone",
      content: (
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          {staff.phoneNumber}
        </Body>
      ),
    },
    {
      key: "staffRole",
      content: (
        <Chip color={colorStaffRole} style={{ padding: "4px 8px" }} round="s">
          <Body
            type="small"
            weight={500}
            color={bodyColorStaffRole(colorStaffRole)}
          >
            {formatStaffRole(staff.staffRole)}
          </Body>
        </Chip>
      ),
    },
    {
      key: "more",
      content: (
        <Chip
          color="grayLight"
          round="s"
          style={{
            padding: "2px 6px",
            cursor: "pointer",
            width: "61px",
          }}
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
    <div>
      <ListItemLayout columns={columns} gridTemplate={STAFF_GRID_TEMPLATE} />
      {isExpanded && (
        <div ref={detailRef} tabIndex={-1} style={{ outline: "none" }}>
          <StaffDetailContent staff={staff} />
        </div>
      )}
    </div>
  );
};
