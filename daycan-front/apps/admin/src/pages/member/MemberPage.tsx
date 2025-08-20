import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, Icon, Button, Input } from "@daycan/ui";
import { memberContainer, memberButton } from "./MemberPage.css.ts";
import { MemberDataList } from "./components/MemberDataList";
import { Filter } from "@/components/Filter";
import { Suspense, useRef } from "react";
import { useMemberFilter } from "./hooks/useMemberFilter.ts";
import { useNavigate } from "react-router-dom";
import { FilterSearchbar, SkeletonList } from "@/components";
import { useGetMemberListSuspenseQuery } from "@/services/member/useMemberQuery";
import { MEMBER_GRID_TEMPLATE } from "./constants/memberGrid.ts";
import { MemberDataListHeader } from "./components/MemberDataListHeader";

const MemberListSuspense = () => {
  const { data: members } = useGetMemberListSuspenseQuery();
  const { filteredMembers } = useMemberFilter(members ?? []);

  return <MemberDataList members={filteredMembers} />;
};

const MemberListSkeleton = () => {
  return (
    <SkeletonList
      title="수급자 목록"
      itemCount={5}
      gridTemplate={MEMBER_GRID_TEMPLATE}
      columnsLength={9}
      containerClassName={memberContainer}
    >
      <MemberDataListHeader />
    </SkeletonList>
  );
};

export const MemberPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNewMember = () => {
    navigate("/member/new");
  };
  const {
    resetCounter,
    handleFilterReset,
    handleCareGradeFilterChange,
    handleGenderFilterChange,
    handleSearchChange,
  } = useMemberFilter([]);

  const filterItems = [
    {
      icon: <Icon name="reset" width={20} height={20} />,
      onClick: handleFilterReset,
    },
    {
      text: "장기요양등급",
      options: ["1급", "2급", "3급", "4급", "5급", "인지지원"],
      onSelect: handleCareGradeFilterChange,
    },
    {
      text: "성별",
      options: ["남성", "여성"],
      onSelect: handleGenderFilterChange,
    },
  ];

  return (
    <div className={memberContainer}>
      {/* 페이지 툴바 */}
      <PageToolbar>
        <Heading>수급자 관리</Heading>
        <div className={memberButton}>
          <Button variant="primary" size="fullWidth" onClick={handleNewMember}>
            <Icon name="plus" />
            <Body type="xsmall">수급자 등록</Body>
          </Button>
        </div>
      </PageToolbar>

      {/* 필터링 및 검색 */}
      <FilterSearchbar>
        <Filter items={filterItems} resetKey={resetCounter} ref={dropdownRef} />
        <Input
          placeholder="수급자 검색"
          leftIcon={<Icon name="search" width={20} height={20} />}
          onChange={(e) => handleSearchChange(e.target.value)}
          inputSize="textSearch"
        />
      </FilterSearchbar>
      {/* 데이터 리스트 */}
      <Suspense fallback={<MemberListSkeleton />}>
        <MemberListSuspense />
      </Suspense>
    </div>
  );
};
