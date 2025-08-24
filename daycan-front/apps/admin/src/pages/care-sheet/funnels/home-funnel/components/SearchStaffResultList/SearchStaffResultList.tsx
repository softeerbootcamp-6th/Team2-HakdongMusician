import React from "react";
import { Body, Chip, COLORS } from "@daycan/ui";
import {
  searchResultList,
  searchResultItem,
  profileImage,
  profileImageImg,
  defaultAvatar,
  userInfo,
  roleTag,
} from "./SearchStaffResultList.css";
import type { TStaff } from "@/services/staff/types";
import { getStaffRole, colorByStaffRole } from "../../utils/parseData";

interface SearchStaffResultListProps {
  staffs: TStaff[];
  onSelect?: (staff: TStaff) => void;
  selectedStaffId?: number;
}

export const SearchStaffResultList: React.FC<SearchStaffResultListProps> = ({
  staffs,
  onSelect,
  selectedStaffId,
}) => {
  const handleItemClick = (staff: TStaff) => {
    onSelect?.(staff);
  };

  return (
    <div className={searchResultList}>
      {staffs.map((staff) => (
        <div
          key={staff.staffId}
          className={searchResultItem}
          data-selected={staff.staffId === selectedStaffId}
          onClick={() => handleItemClick(staff)}
        >
          <div className={profileImage}>
            {staff.avatarUrl ? (
              <img
                src={staff.avatarUrl}
                alt={staff.name}
                className={profileImageImg}
              />
            ) : (
              <div className={defaultAvatar}>
                <Body type="small" weight={600} color={COLORS.gray[400]}>
                  {staff.name.charAt(0)}
                </Body>
              </div>
            )}
          </div>
          <div className={userInfo}>
            <Body type="medium" weight={500} color={COLORS.gray[800]}>
              {staff.name}
            </Body>
          </div>
          <div className={roleTag}>
            <Chip
              color={colorByStaffRole(staff.staffRole)}
              round="s"
              style={{ padding: "4px 6px" }}
            >
              {getStaffRole(staff.staffRole)}
            </Chip>
          </div>
        </div>
      ))}
    </div>
  );
};
