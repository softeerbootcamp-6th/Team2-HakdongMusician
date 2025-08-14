import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState, useMemo, useEffect } from "react";
import type { CareSheetListType } from "../constants/dummy";
import { checkedCareSheetIdsAtom } from "../atoms";

const fetchCareSheets = async (): Promise<{
  applicable: CareSheetListType;
  notApplicable: CareSheetListType;
}> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 실제로는 API에서 가져올 데이터
  return {
    applicable: {
      page: 0,
      result: [
        {
          careSheetId: 1,
          status: "SHEET_PENDING",
          memberMeta: {
            memberId: "M001",
            name: "김철수",
            birthDate: "1980-01-01",
            gender: "MALE",
          },
          isAttending: true,
          writerName: "양동성",
          writerId: 501,
        },
        {
          careSheetId: 2,
          status: "SHEET_DONE",
          memberMeta: {
            memberId: "M002",
            name: "이영희",
            birthDate: "1985-05-15",
            gender: "FEMALE",
          },
          isAttending: true,
          writerName: "최지영",
          writerId: 502,
        },
        {
          careSheetId: 3,
          status: "SHEET_PENDING",
          memberMeta: {
            memberId: "M003",
            name: "박민수",
            birthDate: "1975-12-20",
            gender: "MALE",
          },
          isAttending: true,
          writerName: "박준호",
          writerId: 503,
        },
      ],
      totalElement: 3,
      totalPage: 1,
    },
    notApplicable: {
      page: 0,
      result: [
        {
          careSheetId: 4,
          status: "NOT_APPLICABLE",
          memberMeta: {
            memberId: "M004",
            name: "최수진",
            birthDate: "1990-08-10",
            gender: "FEMALE",
          },
          isAttending: false,
          writerName: "이수진",
          writerId: 504,
        },
        {
          careSheetId: 5,
          status: "NOT_APPLICABLE",
          memberMeta: {
            memberId: "M005",
            name: "정태호",
            birthDate: "1982-03-25",
            gender: "MALE",
          },
          isAttending: false,
          writerName: "김민수",
          writerId: 505,
        },
      ],
      totalElement: 2,
      totalPage: 1,
    },
  };
};

export const useCareSheets = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["careSheets"],
    queryFn: fetchCareSheets,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // 로컬 상태로 관리
  const [resetCounter, setResetCounter] = useState(0);

  // 체크된 ID만 atom으로 관리
  const [checkedCareSheetIds, setCheckedCareSheetIds] = useAtom(
    checkedCareSheetIdsAtom
  );

  // 마감까지 남은 시간 상태
  const [timeLeft, setTimeLeft] = useState<string>("");
  const PM_17 = 19 * 60 * 60 * 1000;

  // 마감까지 남은 시간 계산 (오후 7시 = 19시)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const deadline = new Date(today.getTime() + PM_17);

      // 이미 마감된 경우
      if (now >= deadline) {
        setTimeLeft("마감되었습니다");
        return;
      }

      const diff = deadline.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        setTimeLeft(`마감까지 ${hours}시간 ${minutes}분 남았어요`);
      } else if (minutes > 0) {
        setTimeLeft(`마감까지 ${minutes}분 남았어요`);
      } else {
        setTimeLeft("마감까지 1분 미만 남았어요");
      }
    };

    // 초기 계산
    calculateTimeLeft();

    // 1분마다 업데이트
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [PM_17]);

  // 필터링된 케어시트 (로컬 상태 기반)
  const applicableCareSheets = useMemo(() => {
    if (!data?.applicable) return { result: [] };

    let result = data.applicable.result.filter(
      (item) => item.status === "SHEET_PENDING" || item.status === "SHEET_DONE"
    );

    // 작성 필요를 먼저, 작성 완료를 나중에
    result.sort((a, b) => {
      if (a.status === "SHEET_PENDING" && b.status === "SHEET_DONE") return -1;
      if (a.status === "SHEET_DONE" && b.status === "SHEET_PENDING") return 1;
      return 0;
    });

    return { result };
  }, [data?.applicable]);

  const notApplicableCareSheets = useMemo(() => {
    if (!data?.notApplicable) return { result: [] };

    return {
      result: data.notApplicable.result.filter(
        (item) => item.status === "NOT_APPLICABLE"
      ),
    };
  }, [data?.notApplicable]);

  // 선택 가능한 케어시트 (작성 완료 제외)
  const selectableApplicableCareSheets = useMemo(() => {
    return applicableCareSheets.result.filter(
      (item) => item.status !== "SHEET_DONE"
    );
  }, [applicableCareSheets]);

  const selectableNotApplicableCareSheets = useMemo(() => {
    return notApplicableCareSheets.result.filter(
      (item) => item.status === "NOT_APPLICABLE"
    );
  }, [notApplicableCareSheets]);

  // 전체 선택 상태 계산
  const isAllSelectedApplicable =
    selectableApplicableCareSheets.length > 0 &&
    selectableApplicableCareSheets.every((item) =>
      checkedCareSheetIds.has(item.careSheetId)
    );

  const isIndeterminateApplicable =
    selectableApplicableCareSheets.some((item) =>
      checkedCareSheetIds.has(item.careSheetId)
    ) && !isAllSelectedApplicable;

  const isAllSelectedNotApplicable =
    selectableNotApplicableCareSheets.length > 0 &&
    selectableNotApplicableCareSheets.every((item) =>
      checkedCareSheetIds.has(item.careSheetId)
    );

  const isIndeterminateNotApplicable =
    selectableNotApplicableCareSheets.some((item) =>
      checkedCareSheetIds.has(item.careSheetId)
    ) && !isAllSelectedNotApplicable;

  const hasCheckedApplicableItems = selectableApplicableCareSheets.some(
    (item) => checkedCareSheetIds.has(item.careSheetId)
  );

  const hasCheckedNotApplicableItems = notApplicableCareSheets.result.some(
    (item) => checkedCareSheetIds.has(item.careSheetId)
  );

  // 핸들러 함수들
  const handleFilterReset = () => {
    setResetCounter((prev) => prev + 1);
    setCheckedCareSheetIds(new Set());
  };

  const handleApplicableSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableApplicableCareSheets.map((item) => item.careSheetId)
      );
      setCheckedCareSheetIds(selectableIds);
    } else {
      setCheckedCareSheetIds(new Set());
    }
  };

  const handleNotApplicableSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableNotApplicableCareSheets.map((item) => item.careSheetId)
      );
      setCheckedCareSheetIds(selectableIds);
    } else {
      setCheckedCareSheetIds(new Set());
    }
  };

  const handleItemCheck = (careSheetId: number, checked: boolean) => {
    setCheckedCareSheetIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(careSheetId);
      } else {
        newSet.delete(careSheetId);
      }
      return newSet;
    });
  };

  const handleProcessApplicable = () => {
    const checkedIds = Array.from(checkedCareSheetIds).filter((id) =>
      selectableApplicableCareSheets.some((item) => item.careSheetId === id)
    );
    console.log("결석 처리할 ID들:", checkedIds);
    // TODO: API 호출
    setCheckedCareSheetIds(new Set());
  };

  const handleProcessNotApplicable = () => {
    const checkedIds = Array.from(checkedCareSheetIds).filter((id) =>
      notApplicableCareSheets.result.some((item) => item.careSheetId === id)
    );
    console.log("출석 처리할 ID들:", checkedIds);
    // TODO: API 호출
    setCheckedCareSheetIds(new Set());
  };

  return {
    // 데이터 상태
    applicableCareSheets,
    notApplicableCareSheets,
    selectableApplicableCareSheets,
    selectableNotApplicableCareSheets,
    isLoading,
    error,
    timeLeft,
    resetCounter,
    checkedCareSheetIds,
    hasCheckedApplicableItems,
    hasCheckedNotApplicableItems,
    // 선택 상태
    isAllSelectedApplicable,
    isIndeterminateApplicable,
    isAllSelectedNotApplicable,
    isIndeterminateNotApplicable,

    // 핸들러 함수들
    handleFilterReset,
    handleApplicableSelectAll,
    handleNotApplicableSelectAll,
    handleItemCheck,
    handleProcessApplicable,
    handleProcessNotApplicable,
  };
};
