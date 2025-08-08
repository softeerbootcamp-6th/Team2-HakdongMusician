import { memberDataListContainer } from "./MemberDataList.css.ts";
import { MemberDataListHeader } from "../MemberDataListHeader";
import { MemberDataItems } from "../MemberDataItems/index.ts";

export const MemberDataList = () => {
  return (
    <div className={memberDataListContainer}>
      <MemberDataListHeader />
      <MemberDataItems />
    </div>
  );
};
