import { useAtom } from "jotai";
import { useState, useMemo } from "react";

import { checkedMemberIdsAtom } from "../atoms";
import { useGetReportListQuery } from "@/services/report/useReportQuery";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useSendReportMutation } from "@/services/report/useReportMutation";
import type { TTime } from "@/types/date";

export const useReports = () => {
  const { data: reports, isLoading } = useGetReportListQuery(TODAY_DATE);

  const { mutate: sendReport } = useSendReportMutation();
  const [isReserveSendModalOpen, setIsReserveSendModalOpen] =
    useState<boolean>(false);
  const [isImmediateSendModalOpen, setIsImmediateSendModalOpen] =
    useState<boolean>(false);

  // 로컬 상태로 관리
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState(0);

  // 체크된 ID만 atom으로 관리
  const [checkedMemberIds, setCheckedMemberIds] = useAtom(checkedMemberIdsAtom);

  // 필터링된 리포트 (로컬 상태 기반)
  const filteredReports = useMemo(() => {
    if (!reports) return [];
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

  const sendedReports = useMemo(() => {
    return filteredReports.filter(
      (report) => report.status === "DONE" || report.status === "RESERVED"
    );
  }, [filteredReports]);

  // 선택 가능한 리포트 (REVIEWED 상태만)
  const selectableReports = useMemo(() => {
    return filteredReports.filter((report) => report.status === "REVIEWED");
  }, [filteredReports]);

  // 각 리스트별 전체 선택 상태 계산
  const isAllSelectedFiltered = useMemo(() => {
    return (
      selectableReports.length > 0 &&
      selectableReports.every((report) =>
        checkedMemberIds.has(report.memberMetaEntry.memberId)
      )
    );
  }, [selectableReports, checkedMemberIds]);

  const isIndeterminateFiltered = useMemo(() => {
    return (
      selectableReports.some((report) =>
        checkedMemberIds.has(report.memberMetaEntry.memberId)
      ) && !isAllSelectedFiltered
    );
  }, [selectableReports, checkedMemberIds, isAllSelectedFiltered]);

  const isAllSelectedSended = useMemo(() => {
    return (
      sendedReports.length > 0 &&
      sendedReports.every((report) =>
        checkedMemberIds.has(Number(report.memberMetaEntry.memberId))
      )
    );
  }, [sendedReports, checkedMemberIds]);

  const isIndeterminateSended = useMemo(() => {
    return (
      sendedReports.some((report) =>
        checkedMemberIds.has(Number(report.memberMetaEntry.memberId))
      ) && !isAllSelectedSended
    );
  }, [sendedReports, checkedMemberIds, isAllSelectedSended]);

  const hasCheckedItems = useMemo(() => {
    // REVIEWED 상태의 체크된 리포트가 있는지 확인
    return Array.from(checkedMemberIds).some((memberId) =>
      selectableReports.some(
        (report) => report.memberMetaEntry.memberId === memberId
      )
    );
  }, [checkedMemberIds, selectableReports]);

  // 핸들러 함수들
  const handleFilterReset = () => {
    setSelectedStatus(null);
    setResetCounter((prev) => prev + 1);
    setCheckedMemberIds(new Set());
  };

  const handleStatusFilterChange = (option: string | undefined) => {
    setSelectedStatus(option || null);
    setCheckedMemberIds(new Set()); // 필터 변경 시 체크 해제
  };

  const handleCheckChange = (memberId: number, checked: boolean) => {
    setCheckedMemberIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(memberId);
      } else {
        newSet.delete(memberId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableReports.map((report) => report.memberMetaEntry.memberId)
      );
      setCheckedMemberIds(selectableIds);
    } else {
      setCheckedMemberIds(new Set());
    }
  };

  const handleSelectAllFiltered = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableReports.map((report) => report.memberMetaEntry.memberId)
      );
      setCheckedMemberIds(selectableIds);
    } else {
      setCheckedMemberIds(new Set());
    }
  };

  const handleSelectAllSended = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(
        sendedReports.map((report) => Number(report.memberMetaEntry.memberId))
      );
      setCheckedMemberIds(allIds);
    } else {
      setCheckedMemberIds(new Set());
    }
  };

  const handleImmediateSend = () => {
    // REVIEWED 상태의 리포트만 전송
    const checkedSelectableIds = Array.from(checkedMemberIds).filter(
      (memberId) =>
        selectableReports.some(
          (report) => report.memberMetaEntry.memberId === memberId
        )
    );

    if (checkedSelectableIds.length === 0) {
      console.log("전송할 수 있는 리포트가 없습니다.");
      return;
    }

    sendReport({
      memberIds: checkedSelectableIds,
      sendDate: TODAY_DATE,
    });
    setCheckedMemberIds(new Set());
    setIsImmediateSendModalOpen(false);
  };

  const handleReserveSend = (reserveTime?: TTime) => {
    // REVIEWED 상태의 리포트만 전송
    const checkedSelectableIds = Array.from(checkedMemberIds).filter(
      (memberId) =>
        selectableReports.some(
          (report) => report.memberMetaEntry.memberId === memberId
        )
    );

    if (checkedSelectableIds.length === 0) {
      console.log("전송할 수 있는 리포트가 없습니다.");
      return;
    }

    sendReport({
      memberIds: checkedSelectableIds,
      sendDate: TODAY_DATE,
      sendTime: reserveTime,
    });
    setCheckedMemberIds(new Set());
    setIsReserveSendModalOpen(false);
  };

  return {
    // 데이터 상태
    reports,
    isLoading,

    filteredReports,
    sendedReports,
    selectableReports,
    selectedStatus,
    resetCounter,
    checkedMemberIds,
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
