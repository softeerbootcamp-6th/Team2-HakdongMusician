import { StaffListHeader } from "../StaffListHeader";
import { StaffListItem } from "../StaffListItem";
import {
  staffListContainer,
  itemsContainer,
  emptyContainer,
} from "./StaffList.css";
import { overlayScroll } from "@/styles/scroll.css.ts";
import type { TStaff } from "@/services/staff/types";
import { Body } from "@daycan/ui";

interface StaffListProps {
  staffs: TStaff[];
}

export const StaffList = ({ staffs }: StaffListProps) => {
  return (
    <div className={staffListContainer}>
      <StaffListHeader />
      <div className={`${itemsContainer} ${overlayScroll}`}>
        {staffs.length === 0 ? (
          <div className={emptyContainer}>
            <Body type="medium" weight={400}>
              종사자가 없습니다.
            </Body>
          </div>
        ) : (
          staffs.map((staff, index) => (
            <StaffListItem key={staff.staffId} staff={staff} index={index} />
          ))
        )}
      </div>
    </div>
  );
};
