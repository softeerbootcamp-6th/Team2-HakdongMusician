import { DataListLayout } from "@/components/DataListLayout/DataListLayout";
import { MEMBER_HEADERS } from "@/constants/memberList";
import { DataListRow } from "@/components/DataListRow/DataListRow";
import { type AdminMemberAndGuardianResponse } from "@/types";
import { MemberDataSection } from "../MemberDataSection/MemberDataSection";
import { DataListHeader } from "@/components/DataListHeader/DataListHeader";

interface MemberDataListProps {
  memberDatas: AdminMemberAndGuardianResponse[];
}

export const MemberDataList = ({ memberDatas }: MemberDataListProps) => {
  const handleMemberDetail = (member: AdminMemberAndGuardianResponse) => {
    console.log("수급자 상세 정보:", member);
  };

  const dataListHeader = <DataListHeader columns={MEMBER_HEADERS} />;

  const memberDataSections = memberDatas.map((memberData) => (
    <MemberDataSection memberData={memberData} />
  ));

  const dataListRows = memberDatas.map((memberData, index) => (
    <DataListRow
      key={index}
      data={memberData}
      index={index}
      onDetailClick={() => handleMemberDetail(memberData)}
      dataSection={memberDataSections[index]}
    />
  ));

  /* 
    여기서 DataListLayout 컴포넌트를 사용하여 리턴
  */
  return (
    <DataListLayout
      dataListHeader={dataListHeader}
      dataListRows={dataListRows}
    />
  );
};
