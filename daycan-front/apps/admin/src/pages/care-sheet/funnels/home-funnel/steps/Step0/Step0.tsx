import { Body, COLORS, Icon } from "@daycan/ui";
import { Header, SearchStaffResultList } from "../../components";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentInputContainer,
  careSheetPageContentInputInput,
  searchResultsContainer,
} from "./Step0.css";
import { mockSearchResults } from "../../../../constants/dummy";
import { useState, useEffect } from "react";
import { useFunnel } from "@daycan/hooks";
import type { SearchResultItem } from "../../components/SearchStaffResultList/types";
import { StepButtons } from "../../../../components/StepButtons";

export const Step0 = () => {
  const { toNext, updateState, getStepState } = useFunnel();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<SearchResultItem | null>(
    null
  );

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_0");
    if (existingData) {
      setSelectedUser(existingData.selectedUser || null);
      setSearchQuery(existingData.searchQuery || "");
    }
  }, [getStepState]);

  const filteredResults = mockSearchResults.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // FunnelState에 데이터 저장
    updateState({
      searchQuery: value,
    });

    // 검색어가 비어있으면 선택된 사용자도 초기화
    if (value.length === 0) {
      setSelectedUser(null);
      updateState({
        selectedUser: null,
        searchQuery: value,
      });
    }
  };

  const handleUserSelect = (user: SearchResultItem) => {
    setSelectedUser(user);
    setSearchQuery(user.name);

    // FunnelState에 데이터 저장
    updateState({
      selectedUser: user,
      searchQuery: user.name,
    });
  };

  const handleNext = () => {
    toNext();
  };

  return (
    <div className={careSheetPageContainer}>
      <Header />
      <div className={careSheetPageContent}>
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          누가 기록지를 작성하나요?
        </Body>
        <div className={careSheetPageContentInputContainer}>
          <input
            type="text"
            placeholder="작성자 이름"
            value={searchQuery}
            onChange={handleSearchChange}
            className={careSheetPageContentInputInput}
          />
          <Icon name="search" width={24} height={24} color={COLORS.gray[400]} />
        </div>

        {filteredResults.length > 0 && (
          <div className={searchResultsContainer}>
            <SearchStaffResultList
              results={filteredResults}
              onSelect={handleUserSelect}
              selectedStaffId={selectedUser?.id}
            />
          </div>
        )}

        {selectedUser && (
          <Body type="small" weight={400} color={COLORS.gray[600]}>
            선택된 작성자: {selectedUser.name} ({selectedUser.role})
          </Body>
        )}
      </div>
      <StepButtons onNext={handleNext} isNextEnabled={!!selectedUser} />
    </div>
  );
};
