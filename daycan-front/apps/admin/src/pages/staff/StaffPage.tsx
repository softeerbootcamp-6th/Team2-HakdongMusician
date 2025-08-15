import { PageToolbar } from "@/components/PageToolbar";
import { Body, Button, Heading, Icon, Input } from "@daycan/ui";
import {
  staffButton,
  staffPageContainer,
  staffSearchContainer,
} from "./StaffPage.css";
import { StaffList } from "./components";
import { STAFF_DUMMY } from "./constants/staffDummy";
import { useNavigate } from "react-router-dom";
import { Filter } from "@/components/Filter";
import { useRef, useState } from "react";
import { useStaffFilter } from "./hooks/useStaffFilter";
import { FilterSearchbar } from "@/components";

export const StaffPage = () => {
  const navigate = useNavigate();
  /*
   * 종사자 get API 호출 후 staffs로 뿌려주기
   */
  const [staffs, setStaffs] = useState(STAFF_DUMMY.result);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 필터링 훅 사용
  const {
    filteredStaffs,
    resetCounter,
    handleFilterReset,
    handleStaffRoleFilterChange,
    handleGenderFilterChange,
    handleSearchChange,
  } = useStaffFilter(staffs);
  // 필터 아이템 설정
  const filterItems = [
    {
      icon: <Icon name="reset" width={20} height={20} />,
      onClick: handleFilterReset,
    },
    {
      text: "직무",
      options: ["사회복지사", "요양보호사", "센터장"],
      onSelect: handleStaffRoleFilterChange,
    },
    {
      text: "성별",
      options: ["남성", "여성"],
      onSelect: handleGenderFilterChange,
    },
  ];
  // 종사자 등록 버튼 클릭 시 등록 페이지로 이동
  const goToNewStaffPage = () => {
    navigate("/staff/new");
  };

  return (
    <div className={staffPageContainer}>
      <PageToolbar>
        <Heading>종사자 관리</Heading>
        <div className={staffButton}>
          <Button variant="primary" size="fullWidth" onClick={goToNewStaffPage}>
            <Icon name="plus" />
            <Body type="xsmall">종사자 등록</Body>
          </Button>
        </div>
      </PageToolbar>
      <FilterSearchbar>
        <Filter items={filterItems} resetKey={resetCounter} ref={dropdownRef} />

        {/* 검색 입력 */}
        <Input
          placeholder="종사자 검색"
          leftIcon={<Icon name="search" width={20} height={20} />}
          onChange={(e) => handleSearchChange(e.target.value)}
          inputSize="textSearch"
        />
      </FilterSearchbar>
      {/* 종사자 데이터 리스트 */}
      <StaffList staffs={filteredStaffs} />
    </div>
  );
};
