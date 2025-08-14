import { useState, useEffect } from "react";
import { API_ELDER_DUMMY_DATA } from "@/constants/memberDummyData";
import { useNavigate } from "react-router-dom";

// 드롭다운 상태 타입
type DropdownStates = {
  careGrade: boolean;
  gender: boolean;
};

export const useMember = () => {
  const navigate = useNavigate();
  // 드롭다운 상태 관리
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    careGrade: false,
    gender: false,
  });

  // detail 관련 상태 관리
  const [openDetails, setOpenDetails] = useState<Set<string>>(new Set());
  const [animatingDetails, setAnimatingDetails] = useState<Set<string>>(
    new Set()
  );
  const [closingDetails, setClosingDetails] = useState<Set<string>>(new Set());
  const animationDuration = 400; // 애니메이션 지속 시간 (ms)

  // 더미 데이터
  const members = API_ELDER_DUMMY_DATA.result;

  // 드롭다운 외부 클릭 감지
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

  // 새 수급자 등록 핸들러
  const handleNewMember = () => {
    navigate("/member/new");
  };
  const handleEditMember = (memberId: string) => {
    navigate(`/member/edit/${memberId}`);
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
    setDropdownStates({
      careGrade: false,
      gender: false,
    });
  };

  // detail 관련 함수들
  const getDetailContainerState = (
    memberId: string
  ): "default" | "open" | "closed" => {
    if (closingDetails.has(memberId)) return "closed";
    if (openDetails.has(memberId)) return "open";
    return "default";
  };

  const handleDetailClick = (memberId: string) => {
    if (animatingDetails.has(memberId)) return;

    setAnimatingDetails((prev) => new Set(prev).add(memberId));

    if (openDetails.has(memberId)) {
      // 닫기 애니메이션 시작
      setClosingDetails((prev) => new Set(prev).add(memberId));
      setTimeout(() => {
        setOpenDetails((prev) => {
          const newSet = new Set(prev);
          newSet.delete(memberId);
          return newSet;
        });
        setClosingDetails((prev) => {
          const newSet = new Set(prev);
          newSet.delete(memberId);
          return newSet;
        });
        setAnimatingDetails((prev) => {
          const newSet = new Set(prev);
          newSet.delete(memberId);
          return newSet;
        });
      }, animationDuration);
    } else {
      // 열기 애니메이션
      setOpenDetails((prev) => new Set(prev).add(memberId));
      setTimeout(() => {
        setAnimatingDetails((prev) => {
          const newSet = new Set(prev);
          newSet.delete(memberId);
          return newSet;
        });
      }, animationDuration);
    }
  };

  return {
    members,
    dropdownStates,
    openDetails,
    handleNewMember,
    toggleDropdown,
    handleResetFilters,
    getDetailContainerState,
    handleDetailClick,
    handleEditMember,
  };
};
