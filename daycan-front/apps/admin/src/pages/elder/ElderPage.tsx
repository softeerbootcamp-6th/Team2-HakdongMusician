import { useState, useEffect } from "react";
import { DataListHeader } from "@/components/DataListHeader/index.ts";
import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, Icon, Button, Input, COLORS } from "@daycan/ui";
import {
  elderContainer,
  elderFilterContainer,
  elderFilter,
  elderSearch,
  elderButton,
  resetContainer,
  Divider,
  MemberListContainer,
} from "./ElderPage.css.ts";
import { FilterSearchbar } from "@/components/FilterSearchbar/FilterSearchbar.tsx";
import { DataRow } from "@/components/DataRow/index.ts";
import { Dropdown } from "@/components/DropdownPanel/DropdownPanel.tsx";
import { DropdownChip } from "@/components/DropdownChip";
import { ELDER_HEADERS, ELDER_COLUMNS } from "@/constants/elderList.ts";
import { API_ELDER_DUMMY_DATA } from "@/constants/elderDummyData.ts";
import { type MemberResponse } from "@/types";

export const ElderPage = () => {
  // API 데이터를 그대로 사용
  const apiElderMembers: MemberResponse[] = API_ELDER_DUMMY_DATA.result;

  // 각 칩의 드롭다운 상태 관리
  const [dropdownStates, setDropdownStates] = useState({
    careGrade: false,
    gender: false,
  });

  // 드롭다운 밖 클릭 시 닫기
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
  const handleMemberDetail = (member: MemberResponse) => {
    console.log("수급자 상세 정보:", member);
    // 상세 페이지로 이동하거나 모달 열기
  };

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
    <div className={elderContainer}>
      {/* 페이지 툴바 */}
      <PageToolbar>
        <Heading>수급자 관리</Heading>
        <div className={elderButton}>
          <Button variant="primary" size="fullWidth" onClick={handleNewMember}>
            <Icon name="plus" />
            <Body type="xsmall">새 수급자 등록</Body>
          </Button>
        </div>
      </PageToolbar>
      {/* 필터링 및 검색 */}
      <FilterSearchbar>
        <div className={elderFilterContainer}>
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
          <div className={elderFilter}>
            <DropdownChip
              label="장기요양등급"
              isOpen={dropdownStates.careGrade}
              onClick={() => toggleDropdown("careGrade")}
            >
              <Dropdown />
            </DropdownChip>
            <DropdownChip
              label="성별"
              isOpen={dropdownStates.gender}
              onClick={() => toggleDropdown("gender")}
            >
              <Dropdown />
            </DropdownChip>
          </div>
        </div>
        <div className={elderSearch}>
          <Input
            type="text"
            placeholder="~~~~ 이름으로 검색"
            inputSize="textSearch"
            className={elderSearch}
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

      {/* 수급자 목록 헤더 및 리스트 */}
      <div className={MemberListContainer}>
        <DataListHeader columns={ELDER_HEADERS} />
        {apiElderMembers.map((member, index) => (
          <DataRow
            key={index}
            apiMember={member}
            index={index}
            columns={ELDER_COLUMNS}
            onDetailClick={handleMemberDetail}
          />
        ))}
      </div>
    </div>
  );
};
