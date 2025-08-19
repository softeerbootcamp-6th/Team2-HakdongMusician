import { Body, COLORS, Icon } from "@daycan/ui";
import { Header, SearchStaffResultList } from "../../components";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentInputContainer,
  careSheetPageContentInputInput,
  searchResultsContainer,
} from "./Step0.css";
import { useState, useEffect } from "react";
import { useFunnel } from "@daycan/hooks";
import { StepButtons } from "../../../../components/StepButtons";
import { useGetStaffListQuery } from "@/services/staff/useStaffQuery";
import type { TStaff } from "@/services/staff/types";
import { getStaffRole } from "../../utils/parseData";

export const Step0 = () => {
  const { data: staffList } = useGetStaffListQuery();
  const { toNext, updateState, getStepState } = useFunnel();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<TStaff | null>(null);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_0");
    if (existingData) {
      setSelectedStaff(existingData.selectedStaff || null);
      setSearchQuery(existingData.searchQuery || "");
    }
  }, [getStepState]);

  const filteredResults = staffList?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      setSelectedStaff(null);
      updateState({
        selectedStaff: null,
        searchQuery: value,
      });
    }
  };

  const handleUserSelect = (staff: TStaff) => {
    setSelectedStaff(staff);
    setSearchQuery(staff.name);

    // FunnelState에 데이터 저장
    updateState({
      selectedStaff: staff,
      searchQuery: staff.name,
    });
  };

  const handleNext = () => {
    toNext();
  };

  return (
    <>
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
            <Icon
              name="search"
              width={24}
              height={24}
              color={COLORS.gray[400]}
            />
          </div>

          {filteredResults && filteredResults.length > 0 && (
            <div className={searchResultsContainer}>
              <SearchStaffResultList
                staffs={filteredResults}
                onSelect={handleUserSelect}
                selectedStaffId={selectedStaff?.staffId}
              />
            </div>
          )}

          {selectedStaff && (
            <Body type="small" weight={400} color={COLORS.gray[600]}>
              선택된 작성자: {selectedStaff.name} (
              {getStaffRole(selectedStaff.staffRole)})
            </Body>
          )}
        </div>
      </div>
      <StepButtons onNext={handleNext} isNextEnabled={!!selectedStaff} />
    </>
  );
};
