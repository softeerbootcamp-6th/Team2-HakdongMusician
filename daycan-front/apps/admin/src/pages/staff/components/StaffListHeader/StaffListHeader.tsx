import { ListHeaderLayout } from "@/components";

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

  const gridTemplate = "33px 130px 144px 1fr 132px 132px 100px 100px";

  return <ListHeaderLayout columns={columns} gridTemplate={gridTemplate} />;
};
