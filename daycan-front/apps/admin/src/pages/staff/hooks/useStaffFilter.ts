import { useMemo, useState } from "react";
import type { TStaff } from "@/services/staff/types";

/*
 * useStaffFilter 커스텀 훅은
 * 직무와 성별 그리고 검색창으로 필터링을 하기위해 필요한 상태와 함수를 관리하는 훅입니다.
 * 초기 데이터를 받아와서 필터링을 시행합니다.
 *
 * Filter에서 사용할 필터링 옵션은 직무와 성별입니다.
 * 검색창은 이름으로 검색합니다.
 * @author 소보길
 */
export const useStaffFilter = (initialStaffs: TStaff[]) => {
  // 직무와 성별을 독립적으로 관리
  const [selectedStaffRole, setSelectedStaffRole] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetCounter, setResetCounter] = useState(0);

  // 핸들러 함수들
  const handleFilterReset = () => {
    setSelectedStaffRole(null);
    setSelectedGender(null);
    setResetCounter((prev) => prev + 1);
  };

  const handleStaffRoleFilterChange = (option: string | undefined) => {
    setSelectedStaffRole(option || null);
  };

  const handleGenderFilterChange = (option: string | undefined) => {
    setSelectedGender(option || null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 필터링된 직원 목록
  const filteredStaffs = useMemo(() => {
    let filtered = [...initialStaffs];

    // 이름 검색 필터링
    if (searchQuery.trim()) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 직무별 필터링
    if (selectedStaffRole) {
      switch (selectedStaffRole) {
        case "사회복지사":
          filtered = filtered.filter((s) => s.staffRole === "SOCIAL_WORKER");
          break;
        case "요양보호사":
          filtered = filtered.filter((s) => s.staffRole === "CAREGIVER");
          break;
        case "센터장":
          filtered = filtered.filter((s) => s.staffRole === "DIRECTOR");
          break;
      }
    }

    // 성별 필터링
    if (selectedGender) {
      switch (selectedGender) {
        case "남성":
          filtered = filtered.filter((s) => s.gender === "MALE");
          break;
        case "여성":
          filtered = filtered.filter((s) => s.gender === "FEMALE");
          break;
      }
    }

    return filtered;
  }, [initialStaffs, searchQuery, selectedStaffRole, selectedGender]);

  return {
    // 필터링된 데이터
    filteredStaffs,

    // 필터 상태
    selectedStaffRole,
    selectedGender,
    searchQuery,
    resetCounter,

    // 핸들러 함수들
    handleFilterReset,
    handleStaffRoleFilterChange,
    handleGenderFilterChange,
    handleSearchChange,
  };
};
