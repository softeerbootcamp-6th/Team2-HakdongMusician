import { useState, useEffect } from "react";
import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, Icon, Button, Input, COLORS } from "@daycan/ui";
import {
  memberContainer,
  memberFilterContainer,
  memberFilter,
  memberSearch,
  memberButton,
  resetContainer,
  Divider,
} from "./MemberPage.css.ts";
import { FilterSearchbar } from "@/components/FilterSearchbar/FilterSearchbar.tsx";
import { DropDownPanel } from "@/components/DropDownPanel/DropDownPanel.tsx";
import { DropDownChip } from "@/components/DropdownChip";
import { MemberDataList } from "./components/MemberDataList/MemberDataList.tsx";
import { API_ELDER_DUMMY_DATA } from "@/constants/memberDummyData.ts";

export const MemberPage = () => {
  // 각 칩의 드롭다운 상태 관리
  const [dropdownStates, setDropdownStates] = useState({
    careGrade: false,
    gender: false,
  });
  // 더미 데이터로 초기화
  const dummyMember = API_ELDER_DUMMY_DATA.result;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-dropdown-container]")) {
        setDropdownStates({
          careGrade: false,
          gender: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNewMember = () => {
    console.log("새 수급자 등록");
    // 등록 페이지로 이동하거나 모달 열기
  };

  // 드롭다운 토글 함수
  const toggleDropdown = (type: "careGrade" | "gender") => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: !prev[type],
      // 다른 드롭다운 닫기
      ...(type === "careGrade" ? { gender: false } : { careGrade: false }),
    }));
  };

  const handleResetFilters = () => {
    console.log("필터 초기화");
    // 드롭다운 상태도 초기화
    setDropdownStates({
      careGrade: false,
      gender: false,
    });
    // 필터 초기화 로직
  };
  return (
    <div className={memberContainer}>
      {/* 페이지 툴바 */}
      <PageToolbar>
        <Heading>수급자 관리</Heading>
        <div className={memberButton}>
          <Button variant="primary" size="fullWidth" onClick={handleNewMember}>
            <Icon name="plus" />
            <Body type="xsmall">새 수급자 등록</Body>
          </Button>
        </div>
      </PageToolbar>

      {/* 필터링 및 검색 */}
      <FilterSearchbar>
        <div className={memberFilterContainer}>
          <div className={resetContainer} onClick={handleResetFilters}>
            <Icon
              name="reset"
              width={20}
              height={20}
              color={COLORS.gray[300]}
            />
          </div>
          <div className={Divider} />
          {/* 필터링 chips */}
          <div className={memberFilter}>
            <DropDownChip
              label="장기요양등급"
              isOpen={dropdownStates.careGrade}
              onClick={() => toggleDropdown("careGrade")}
            >
              <DropDownPanel />
            </DropDownChip>
            <DropDownChip
              label="성별"
              isOpen={dropdownStates.gender}
              onClick={() => toggleDropdown("gender")}
            >
              <DropDownPanel />
            </DropDownChip>
          </div>
        </div>
        <div className={memberSearch}>
          <Input
            type="text"
            placeholder="~~~~ 이름으로 검색"
            inputSize="textSearch"
            className={memberSearch}
            flexRule="none"
          >
            <Icon
              name="search"
              width={24}
              height={24}
              color={COLORS.gray[300]}
            />
          </Input>
        </div>
      </FilterSearchbar>

      {/* 수급자 목록 */}
      <MemberDataList memberDatas={dummyMember} />
    </div>
  );
};
