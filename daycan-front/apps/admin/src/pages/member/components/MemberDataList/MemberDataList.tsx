import {
  memberDataListContainer,
  itemsContainer,
  emptyContainer,
} from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { MemberDataItem } from "../MemberDataItem/MemberDataItem.tsx";
import type { TMember } from "@/services/member/types";
import { overlayScroll } from "@/styles/scroll.css.ts";
import { Body } from "@daycan/ui";

interface MemberDataListProps {
  members: TMember[];
}

export const MemberDataList = ({ members }: MemberDataListProps) => {
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />
      {/* 데이터 리스트 */}
      <div className={`${itemsContainer} ${overlayScroll}`}>
        {members.length === 0 ? (
          <div className={emptyContainer}>
            <Body type="medium" weight={400}>
              수급자가 없습니다.
            </Body>
          </div>
        ) : (
          members.map((member, idx) => (
            <MemberDataItem key={member.id} member={member} index={idx} />
          ))
        )}
      </div>
    </div>
  );
};
