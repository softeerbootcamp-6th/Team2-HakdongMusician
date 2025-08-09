import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, Icon, Button, Input, COLORS } from "@daycan/ui";
import {
  memberContainer,
  memberFilterContainer,
  memberFilter,
  memberSearch,
  memberButton,
  resetContainer,
  divider,
} from "./MemberPage.css.ts";
import { FilterSearchbar } from "@/components/FilterSearchbar/FilterSearchbar.tsx";
import { DropDownPanel } from "@/components/DropDownPanel/DropDownPanel.tsx";
import { DropDownChip } from "@/components/DropDownChip/index.ts";
import { MemberDataList } from "./components/MemberDataList/MemberDataList.tsx";
import { useMember } from "./hooks";

export const MemberPage = () => {
  const {
    dropdownStates,
    handleNewMember,
    toggleDropdown,
    handleResetFilters,
  } = useMember();

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
          <div className={divider} />
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
          />
        </div>
      </FilterSearchbar>

      {/* 데이터 리스트 */}
      <MemberDataList />
    </div>
  );
};
