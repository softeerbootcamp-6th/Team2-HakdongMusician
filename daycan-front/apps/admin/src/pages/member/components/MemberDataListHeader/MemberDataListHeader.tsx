import { ListHeaderLayout } from "@/components/ListHeaderLayout/ListHeaderLayout.tsx";
import { MEMBER_GRID_TEMPLATE } from "../../constants/memberGrid";

export const MemberDataListHeader = () => {
  const columns = [
    { key: "order", label: "순서" },
    { key: "profile", label: "프로필" },
    { key: "name", label: "이름" },
    { key: "birthDate", label: "생년월일" },
    { key: "gender", label: "성별" },
    { key: "careLevel", label: "장기요양등급" },
    { key: "username", label: "장기요양인정번호" },
    { key: "guardianPhone", label: "보호자 연락처" },
  ];

  return (
    <ListHeaderLayout columns={columns} gridTemplate={MEMBER_GRID_TEMPLATE} />
  );
};
