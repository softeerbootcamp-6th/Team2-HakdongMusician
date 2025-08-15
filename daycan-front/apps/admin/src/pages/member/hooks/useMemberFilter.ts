import { useMemo, useState } from "react";
import type { MemberListResponse } from "@/pages/member/constants/memberDummyData";

/*
 * useMemberFilter 커스텀 훅은
 * 장기요양등급과 성별 그리고 검색창으로 필터링을 하기위해 필요한 상태와 함수를 관리하는 훅입니다.
 * 초기 데이터를 받아와서 필터링을 시행합니다.
 *
 * Filter에서 사용할 필터링 옵션은 장기요양등급과 성별입니다.
 * 검색창은 이름으로 검색합니다.
 * @author 소보길
 */
export const useMemberFilter = (initialMembers: MemberListResponse) => {
  const [selectedCareGrade, setSelectedCareGrade] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterReset = () => {
    setSelectedCareGrade(null);
    setSelectedGender(null);
    setResetCounter((prev) => prev + 1);
  };

  const handleCareGradeFilterChange = (option: string | undefined) => {
    setSelectedCareGrade(option || null);
  };

  const handleGenderFilterChange = (option: string | undefined) => {
    setSelectedGender(option || null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredMembers = useMemo(() => {
    let filtered = [...initialMembers];

    if (searchQuery.trim()) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCareGrade) {
      switch (selectedCareGrade) {
        case "1급":
          filtered = filtered.filter((m) => m.careLevel === 1);
          break;
        case "2급":
          filtered = filtered.filter((m) => m.careLevel === 2);
          break;
        case "3급":
          filtered = filtered.filter((m) => m.careLevel === 3);
          break;
        case "4급":
          filtered = filtered.filter((m) => m.careLevel === 4);
          break;
        case "5급":
          filtered = filtered.filter((m) => m.careLevel === 5);
          break;
        case "인지지원":
          filtered = filtered.filter((m) => m.careLevel === 6);
          break;
      }
    }
    if (selectedGender) {
      switch (selectedGender) {
        case "남성":
          filtered = filtered.filter((m) => m.gender === "MALE");
          break;
        case "여성":
          filtered = filtered.filter((m) => m.gender === "FEMALE");
          break;
      }
    }
    return filtered;
  }, [initialMembers, searchQuery, selectedCareGrade, selectedGender]);

  return {
    filteredMembers,
    selectedCareGrade,
    selectedGender,
    resetCounter,
    handleFilterReset,
    handleCareGradeFilterChange,
    handleGenderFilterChange,
    handleSearchChange,
  };
};
