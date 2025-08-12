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
import { FilterSearchbar } from "@/components/FilterSearchbar";
import { MemberDataList } from "./components/MemberDataList";
import { MemberEditAuthModal } from "./components/MemberEditAuthModal";
import { useMember } from "./hooks";
import { useState } from "react";

export const MemberPage = () => {
  const {
    // dropdownStates,
    handleNewMember,
    // toggleDropdown,
    handleResetFilters,
    handleEditMember,
    members,
  } = useMember();

  const [isMemberEditAuthModalOpen, setIsMemberEditAuthModalOpen] =
    useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  // 수정 버튼 클릭 시 모달 열기
  const handleEditButtonClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsMemberEditAuthModalOpen(true);
  };

  // 모달에서 인증 성공 시 라우팅
  const handleEditAccessConfirm = () => {
    setIsMemberEditAuthModalOpen(false);
    if (selectedMemberId) {
      handleEditMember(selectedMemberId);
    }
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
          <div className={divider} />
          {/* 필터링 chips */}
          <div className={memberFilter}>
            {/* <DropDownChip
              label="장기요양등급"
              isOpen={dropdownStates.careGrade}
              onClick={() => toggleDropdown("careGrade")}
            >
              <DropDownPanel
                title="장기요양등급"
                options={CARE_LEVEL_OPTIONS}
                onChange={() => {}}
              />
            </DropDownChip>
            <DropDownChip
              label="성별"
              isOpen={dropdownStates.gender}
              onClick={() => toggleDropdown("gender")}
            >
              <DropDownPanel
                title="성별"
                options={GENDER_OPTIONS}
                onChange={() => {}}
              />
            </DropDownChip> */}
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
      <MemberDataList
        onEditButtonClick={handleEditButtonClick}
        members={members}
      />

      <MemberEditAuthModal
        isOpen={isMemberEditAuthModalOpen}
        onClose={() => {
          setIsMemberEditAuthModalOpen(false);
          setSelectedMemberId("");
        }}
        onEditAccessConfirm={handleEditAccessConfirm}
        memberId={selectedMemberId}
      />
    </div>
  );
};
