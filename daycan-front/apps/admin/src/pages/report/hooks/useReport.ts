import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState, useMemo } from "react";

import type { ReportListItemType } from "../components/ReportListItem/ReportListItem";
import { checkedReportIdsAtom } from "../atoms";
import { mockReports } from "../constants/dummy";

const fetchReports = async (): Promise<ReportListItemType[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockReports;
};

export const useReports = () => {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const [isReserveSendModalOpen, setIsReserveSendModalOpen] =
    useState<boolean>(false);
  const [isImmediateSendModalOpen, setIsImmediateSendModalOpen] =
    useState<boolean>(false);

  // 로컬 상태로 관리
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState(0);

  // 체크된 ID만 atom으로 관리
  const [checkedReportIds, setCheckedReportIds] = useAtom(checkedReportIdsAtom);

  // 필터링된 리포트 (로컬 상태 기반)
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // 상태별 필터링
    if (selectedStatus) {
      switch (selectedStatus) {
        case "검토 완료":
          filtered = filtered.filter((report) => report.status === "REVIEWED");
          break;
        case "검토 대기":
          filtered = filtered.filter((report) => report.status === "CREATED");
          break;
        case "검토 불가능":
          filtered = filtered.filter(
            (report) => report.status === "NOT_APPLICABLE"
          );
          break;
      }
    }

    return filtered;
  }, [reports, selectedStatus]);

  // 선택 가능한 리포트 (REVIEWED 상태만)
  const selectableReports = useMemo(() => {
    return filteredReports.filter((report) => report.status === "REVIEWED");
  }, [filteredReports]);

  // 전송 완료 리포트 (mockSendedReports)
  const sendedReports = useMemo(() => {
    // 실제로는 API에서 가져올 데이터
    return [
      {
        id: 101,
        memberMetaEntry: {
          memberId: "M101",
          name: "전송완료1",
          birthDate: "1980-01-01",
          gender: "MALE",
        },
        guardianMetaEntry: {
          guardianName: "전송완료1부모",
          guardianContact: "010-1111-1111",
        },
        status: "DONE",
      },
      {
        id: 102,
        memberMetaEntry: {
          memberId: "M102",
          name: "전송완료2",
          birthDate: "1985-05-15",
          gender: "FEMALE",
        },
        guardianMetaEntry: {
          guardianName: "전송완료2부모",
          guardianContact: "010-2222-2222",
        },
        status: "DONE",
      },
    ];
  }, []);

  // 각 리스트별 전체 선택 상태 계산
  const isAllSelectedFiltered = useMemo(() => {
    return (
      selectableReports.length > 0 &&
      selectableReports.every((report) => checkedReportIds.has(report.id))
    );
  }, [selectableReports, checkedReportIds]);

  const isIndeterminateFiltered = useMemo(() => {
    return (
      selectableReports.some((report) => checkedReportIds.has(report.id)) &&
      !isAllSelectedFiltered
    );
  }, [selectableReports, checkedReportIds, isAllSelectedFiltered]);

  const isAllSelectedSended = useMemo(() => {
    return (
      sendedReports.length > 0 &&
      sendedReports.every((report) => checkedReportIds.has(report.id))
    );
  }, [sendedReports, checkedReportIds]);

  const isIndeterminateSended = useMemo(() => {
    return (
      sendedReports.some((report) => checkedReportIds.has(report.id)) &&
      !isAllSelectedSended
    );
  }, [sendedReports, checkedReportIds, isAllSelectedSended]);

  const hasCheckedItems = useMemo(() => {
    // REVIEWED 상태의 체크된 리포트가 있는지 확인
    return Array.from(checkedReportIds).some((id) =>
      selectableReports.some((report) => report.id === id)
    );
  }, [checkedReportIds, selectableReports]);

  // 핸들러 함수들
  const handleFilterReset = () => {
    setSelectedStatus(null);
    setResetCounter((prev) => prev + 1);
    setCheckedReportIds(new Set());
  };

  const handleStatusFilterChange = (option: string | undefined) => {
    setSelectedStatus(option || null);
    setCheckedReportIds(new Set()); // 필터 변경 시 체크 해제
  };

  const handleCheckChange = (id: number, checked: boolean) => {
    setCheckedReportIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableReports.map((report) => report.id)
      );
      setCheckedReportIds(selectableIds);
    } else {
      setCheckedReportIds(new Set());
    }
  };

  const handleSelectAllFiltered = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableReports.map((report) => report.id)
      );
      setCheckedReportIds(selectableIds);
    } else {
      setCheckedReportIds(new Set());
    }
  };

  const handleSelectAllSended = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(sendedReports.map((report) => report.id));
      setCheckedReportIds(allIds);
    } else {
      setCheckedReportIds(new Set());
    }
  };

  const handleImmediateSend = () => {
    // REVIEWED 상태의 리포트만 전송
    const checkedSelectableIds = Array.from(checkedReportIds).filter((id) =>
      selectableReports.some((report) => report.id === id)
    );

    if (checkedSelectableIds.length === 0) {
      console.log("전송할 수 있는 리포트가 없습니다.");
      return;
    }

    console.log("즉시 전송:", checkedSelectableIds);
    // TODO: API 호출
    setCheckedReportIds(new Set());
    setIsImmediateSendModalOpen(true);
  };

  const handleReserveSend = () => {
    // REVIEWED 상태의 리포트만 전송
    const checkedSelectableIds = Array.from(checkedReportIds).filter((id) =>
      selectableReports.some((report) => report.id === id)
    );

    if (checkedSelectableIds.length === 0) {
      console.log("전송할 수 있는 리포트가 없습니다.");
      return;
    }

    console.log("예약 전송:", checkedSelectableIds);
    // TODO: API 호출
    setCheckedReportIds(new Set());
    setIsReserveSendModalOpen(true);
  };

  return {
    // 데이터 상태
    reports,
    isLoading,

    filteredReports,
    selectableReports,
    selectedStatus,
    resetCounter,
    checkedReportIds,
    hasCheckedItems,
    isAllSelectedFiltered,
    isIndeterminateFiltered,
    isAllSelectedSended,
    isIndeterminateSended,
    isReserveSendModalOpen,
    isImmediateSendModalOpen,
    // 핸들러 함수들
    handleFilterReset,
    handleStatusFilterChange,
    handleCheckChange,
    handleSelectAll,
    handleSelectAllFiltered,
    handleSelectAllSended,
    handleImmediateSend,
    handleReserveSend,
    setIsReserveSendModalOpen,
    setIsImmediateSendModalOpen,
  };
};
