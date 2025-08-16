import { ListHeaderLayout } from "@/components";
import { STAFF_GRID_TEMPLATE } from "../../constants/staffGrid";

export const StaffListHeader = () => {
  const columns = [
    { key: "order", label: "순서" },
    { key: "profile", label: "프로필" },
    { key: "name", label: "이름" },
    { key: "birthDate", label: "생년월일" },
    { key: "gender", label: "성별" },
    { key: "phone", label: "연락처" },
    { key: "staffRole", label: "직무" },
    // { key: "more", label: "..." },
  ];

  return (
    <ListHeaderLayout columns={columns} gridTemplate={STAFF_GRID_TEMPLATE} />
  );
};
