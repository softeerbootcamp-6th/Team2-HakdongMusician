import { Body, Chip, COLORS } from "@daycan/ui";
import { profileImage } from "./StaffListItem.css";
import profile from "@/assets/images/profile.png";
import {
  colorByStaffRole,
  formatBirthDate,
  formatGender,
  formatStaffRole,
} from "@/utils";
import { useState } from "react";
import { StaffDetailContent } from "../StaffDetailContent";
import type { StaffListResponse } from "@/pages/staff-register/constants/staff";
import { ListItemLayout } from "@/components";
import { STAFF_GRID_TEMPLATE } from "../../constants/staffGrid";

interface StaffListItemProps {
  staff: StaffListResponse;
  index: number;
}
export const StaffListItem = ({ staff, index }: StaffListItemProps) => {
  //상세보기 상태
  const [isExpanded, setIsExpanded] = useState(false);

  //상세보기 토글 핸들러
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
      content: <img src={profile} alt="avatar" className={profileImage} />,
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
      {isExpanded && <StaffDetailContent staff={staff} />}
    </div>
  );
};
