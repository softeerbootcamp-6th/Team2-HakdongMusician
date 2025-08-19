import {
  memberDataListContainer,
  itemsContainer,
} from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { MemberDataItem } from "../MemberDataItem/MemberDataItem.tsx";
import type { TMember } from "@/services/member/types";

interface MemberDataListProps {
  members: TMember[];
}

export const MemberDataList = ({ members }: MemberDataListProps) => {
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />
      {/* 데이터 리스트 */}
      <div className={itemsContainer}>
        {members.map((member, idx) => (
          <MemberDataItem key={member.id} member={member} index={idx} />
        ))}
      </div>
    </div>
  );
};
