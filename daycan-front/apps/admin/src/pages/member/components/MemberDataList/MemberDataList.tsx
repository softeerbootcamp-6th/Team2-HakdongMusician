import {
  memberDataListContainer,
  itemsContainer,
} from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { MemberDataItem } from "../MemberDataItem/MemberDataItem.tsx";
import type { MemberData } from "@/pages/member/constants/member.ts";

interface MemberDataListProps {
  members: MemberData[];
}

export const MemberDataList = ({ members }: MemberDataListProps) => {
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />
      {/* 데이터 리스트 */}
      <div className={itemsContainer}>
        {members.map((member, idx) => (
          <MemberDataItem key={member.userCode} member={member} index={idx} />
        ))}
      </div>
    </div>
  );
};
