import { StaffListHeader } from "../StaffListHeader";
import { StaffListItem } from "../StaffListItem";
import { staffListContainer, itemsContainer } from "./StaffList.css";
import type { StaffListResponse } from "@/pages/staff-register/constants/staff";

interface StaffListProps {
  staffs: StaffListResponse[];
}

export const StaffList = ({ staffs }: StaffListProps) => {
  return (
    <div className={staffListContainer}>
      <StaffListHeader />
      <div className={itemsContainer}>
        {staffs.map((staff, index) => (
          <StaffListItem key={staff.staffId} staff={staff} index={index} />
        ))}
      </div>
    </div>
  );
};
