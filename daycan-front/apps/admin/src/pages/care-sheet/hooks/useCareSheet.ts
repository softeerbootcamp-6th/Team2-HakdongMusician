import { useAtom } from "jotai";
import { useState, useMemo, useEffect } from "react";
import { checkedCareSheetIdsAtom } from "../atoms";
import { useGetCareSheetListSuspenseQuery } from "@/services/careSheet/useCareSheetQuery";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useUpdateCareSheetAttendanceMutation } from "@/services/careSheet/useCareSheetMutation";
import { useToast } from "@daycan/ui";

export const useCareSheets = () => {
  const { data } = useGetCareSheetListSuspenseQuery(TODAY_DATE);
  const { showToast } = useToast();
  // 로컬 상태로 관리
  const [resetCounter, setResetCounter] = useState(0);

  // 체크된 ID만 atom으로 관리
  const [checkedCareSheetIds, setCheckedCareSheetIds] = useAtom(
    checkedCareSheetIdsAtom
  );

  // 마감까지 남은 시간 상태
  const [timeLeft, setTimeLeft] = useState<string>("");
  const PM_17 = 19 * 60 * 60 * 1000;

  // API 호출 훅
  const { mutate: updateCareSheetAttendance } =
    useUpdateCareSheetAttendanceMutation();

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
    if (!data) return { result: [] };

    let result = data.filter(
      (item) => item.status === "PENDING" || item.status === "DONE"
    );

    // 작성 필요를 먼저, 작성 완료를 나중에
    result.sort((a, b) => {
      if (a.status === "PENDING" && b.status === "DONE") return -1;
      if (a.status === "DONE" && b.status === "PENDING") return 1;
      return 0;
    });

    return { result };
  }, [data]);

  const notApplicableCareSheets = useMemo(() => {
    if (!data) return { result: [] };

    return {
      result: data.filter((item) => item.status === "NOT_APPLICABLE"),
    };
  }, [data]);

  // 선택 가능한 케어시트 (작성 완료 제외)
  const selectableApplicableCareSheets = useMemo(() => {
    return applicableCareSheets.result.filter((item) => item.status !== "DONE");
  }, [applicableCareSheets]);

  const selectableNotApplicableCareSheets = useMemo(() => {
    return notApplicableCareSheets.result.filter(
      (item) => item.status === "NOT_APPLICABLE" || item.status === "PENDING"
    );
  }, [notApplicableCareSheets]);

  // 전체 선택 상태 계산
  const isAllSelectedApplicable =
    selectableApplicableCareSheets.length > 0 &&
    selectableApplicableCareSheets.every((item) =>
      checkedCareSheetIds.has(item.memberMeta.memberId)
    );

  const isIndeterminateApplicable =
    selectableApplicableCareSheets.some((item) =>
      checkedCareSheetIds.has(item.memberMeta.memberId)
    ) && !isAllSelectedApplicable;

  const isAllSelectedNotApplicable =
    selectableNotApplicableCareSheets.length > 0 &&
    selectableNotApplicableCareSheets.every((item) =>
      checkedCareSheetIds.has(item.memberMeta.memberId)
    );

  const isIndeterminateNotApplicable =
    selectableNotApplicableCareSheets.some((item) =>
      checkedCareSheetIds.has(item.memberMeta.memberId)
    ) && !isAllSelectedNotApplicable;

  const hasCheckedApplicableItems = selectableApplicableCareSheets.some(
    (item) => checkedCareSheetIds.has(item.memberMeta.memberId)
  );

  const hasCheckedNotApplicableItems = notApplicableCareSheets.result.some(
    (item) => checkedCareSheetIds.has(item.memberMeta.memberId)
  );

  // 핸들러 함수들
  const handleFilterReset = () => {
    setResetCounter((prev) => prev + 1);
    setCheckedCareSheetIds(new Set());
  };

  const handleApplicableSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableApplicableCareSheets.map((item) => item.memberMeta.memberId)
      );
      setCheckedCareSheetIds(selectableIds);
    } else {
      setCheckedCareSheetIds(new Set());
    }
  };

  const handleNotApplicableSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = new Set(
        selectableNotApplicableCareSheets.map(
          (item) => item.memberMeta.memberId
        )
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
      selectableApplicableCareSheets.some(
        (item) => item.memberMeta.memberId === id
      )
    );

    //API 호출
    updateCareSheetAttendance(
      {
        date: TODAY_DATE,
        memberIds: checkedIds,
        action: "ABSENT",
      },
      {
        onSuccess: () => {
          setCheckedCareSheetIds(new Set());
          showToast({
            data: {
              message: "결석 처리가 완료되었습니다.",
              variant: "pc",
              type: "success",
            },
          });
        },
      }
    );
  };

  const handleProcessNotApplicable = () => {
    const checkedIds = Array.from(checkedCareSheetIds).filter((id) =>
      notApplicableCareSheets.result.some(
        (item) => item.memberMeta.memberId === id
      )
    );
    updateCareSheetAttendance(
      {
        date: TODAY_DATE,
        memberIds: checkedIds,
        action: "PRESENT",
      },
      {
        onSuccess: () => {
          setCheckedCareSheetIds(new Set());
          showToast({
            data: {
              message: "출석 처리가 완료되었습니다.",
              variant: "pc",
              type: "success",
            },
          });
        },
      }
    );
  };

  return {
    // 데이터 상태
    applicableCareSheets,
    notApplicableCareSheets,
    selectableApplicableCareSheets,
    selectableNotApplicableCareSheets,
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
