import { StaffListHeader } from "../StaffListHeader";
import { StaffListItem } from "../StaffListItem";
import { staffListContainer, itemsContainer } from "./StaffList.css";
import { overlayScroll } from "@/styles/scroll.css.ts";
import type { TStaff } from "@/services/staff/types";

interface StaffListProps {
  staffs: TStaff[];
}

export const StaffList = ({ staffs }: StaffListProps) => {
  return (
    <div className={staffListContainer}>
      <StaffListHeader />
      <div className={`${itemsContainer} ${overlayScroll}`}>
        {staffs.map((staff, index) => (
          <StaffListItem key={staff.staffId} staff={staff} index={index} />
        ))}
      </div>
    </div>
  );
};
