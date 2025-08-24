import { Body, COLORS, HighlightingHeading, Icon } from "@daycan/ui";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentTitleContainer,
} from "../Step0/Step0.css";
import { Header, WritingMethodCard } from "../../components";
import { StepButtons } from "../../../../components/StepButtons";
import pictureMethod from "@/assets/png/picture-method.png";
import selectMethod from "@/assets/png/select-method.png";
import { useFunnel } from "@daycan/hooks";
import { getStaffName } from "../../utils/parseData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  todayWritedCareSheetContainer,
  todayWritedCareSheetTitle,
} from "./Step1.css";

import {
  useGetCareSheetListQuery,
  useGetCareSheetDetailQuery,
} from "@/services/careSheet/useCareSheetQuery";
import { CareSheetListItem } from "@/pages/care-sheet-today/components/CareSheetListItem";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useAtomValue, useSetAtom } from "jotai";
import { homeFunnelDataAtom } from "../../atoms/homeAtom";
import { infoFunnelDataAtom } from "../../../info-funnel/atoms/infoAtom";
import { diagnosisFunnelDataAtom } from "../../../diagnosis-funnel/atoms/diagnosisAtom";
import { prefillCareSheetData } from "@/utils/careSheetPrefill";
import { getStoredValue } from "../../../utils/storage";
import type { YearMonthDay } from "@/types/date";
import { ConfirmModal } from "../../components";
import type { DiagnosisFunnelData } from "../../../diagnosis-funnel/types/diagnosisType";
import type { InfoFunnelData } from "../../../info-funnel/types/infoType";

// localStorage 키 상수
const RECENT_METHOD_KEY = "careSheet:recentMethod";

export const Step1 = () => {
  const navigate = useNavigate();
  const { toPrev, toNext, funnelState } = useFunnel();
  const [recentMethod, setRecentMethod] = useState<string | null>(null);
  const [selectedCareSheet, setSelectedCareSheet] = useState<{
    date: YearMonthDay;
    memberId: number;
  } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMethod, setPendingMethod] = useState<string | null>(null);
  const homeFunnelData = useAtomValue(homeFunnelDataAtom);

  // Jotai setter 함수들
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);
  const setDiagnosisFunnelData = useSetAtom(diagnosisFunnelDataAtom);

  // 작성자 이름 가져오기
  const staffName = getStaffName(funnelState);

  const { data: careSheetList } = useGetCareSheetListQuery(
    TODAY_DATE,
    funnelState?.STEP_0?.selectedStaff?.staffId || funnelState?.STEP_0?.writerId
  );

  // 선택된 기록지 상세 데이터 조회
  const { data: careSheetDetail } = useGetCareSheetDetailQuery(
    selectedCareSheet?.date!,
    selectedCareSheet?.memberId!,
    !!selectedCareSheet
  );

  // 컴포넌트 마운트 시 localStorage에서 최근 사용한 방법 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_METHOD_KEY);
    if (stored) {
      setRecentMethod(stored);
    }
  }, []);

  // careSheetDetail이 로드되면 prefill 실행
  useEffect(() => {
    if (careSheetDetail && selectedCareSheet) {
      toNext();

      prefillCareSheetData(
        careSheetDetail,
        () => {}, // homeFunnelData는 이미 설정되어 있음
        setInfoFunnelData,
        setDiagnosisFunnelData
      );
      // prefill 완료 후 navigate
      navigate(`/care-sheet/new/diagnosis`);
      // 상태 초기화
      setSelectedCareSheet(null);
    }
  }, [
    careSheetDetail,
    selectedCareSheet,
    setInfoFunnelData,
    setDiagnosisFunnelData,
    navigate,
  ]);

  // 기존 데이터 확인 함수
  const checkExistingData = (): {
    hasData: boolean;
    memberId?: number;
    date?: YearMonthDay;
    memberName?: string;
  } => {
    const infoData = getStoredValue<InfoFunnelData>("careSheet:infoFunnel");
    const diagnosisData = getStoredValue<DiagnosisFunnelData>(
      "careSheet:diagnosisFunnel"
    );

    if (!infoData && !diagnosisData) {
      return { hasData: false };
    }

    // 더 구체적인 정보 추출 (InfoFunnelData에서만 memberId와 date를 가져옴)
    let memberId: number | undefined;
    let date: YearMonthDay | undefined;
    let memberName: string | undefined;

    if (infoData) {
      memberId = infoData.memberId;
      date = infoData.date;
      // careSheetList에서 멤버 이름 찾기
      if (careSheetList && memberId) {
        const member = careSheetList.find(
          (item) => item.memberMeta.memberId === memberId
        );
        if (member) {
          memberName = member.memberMeta.name;
        }
      }
    }

    return {
      hasData: true,
      memberId,
      date,
      memberName: memberName || "알 수 없는 멤버",
    };
  };

  const handleMethodSelect = (method: string) => {
    // 사진 등록은 기존 데이터 확인 없이 바로 진행
    if (method === "photo") {
      proceedWithMethod(method);
      return;
    }

    // 직접 입력만 기존 데이터 확인
    const existingData = checkExistingData();
    if (existingData.hasData) {
      setPendingMethod(method);
      setShowConfirmModal(true);
      return;
    }

    // 기존 데이터가 없으면 바로 진행
    proceedWithMethod(method);
  };

  const proceedWithMethod = (method: string) => {
    // localStorage에 선택된 방법 저장
    localStorage.setItem(RECENT_METHOD_KEY, method);
    setRecentMethod(method);
    toNext();

    if (method === "direct") {
      navigate("/care-sheet/new/info");
    } else {
      navigate("/care-sheet/new/ocr");
    }
  };

  const handleContinueExisting = () => {
    if (pendingMethod) {
      // 기존 데이터를 유지하고 해당 퍼널로 이동
      if (pendingMethod === "direct") {
        navigate("/care-sheet/new/info");
      } else {
        navigate("/care-sheet/new/ocr");
      }
      setShowConfirmModal(false);
      setPendingMethod(null);
    }
  };

  const handleStartNew = () => {
    // 기존 데이터를 먼저 삭제
    setInfoFunnelData(null);
    setDiagnosisFunnelData(null);

    // 모달 상태 정리
    setShowConfirmModal(false);
    setPendingMethod(null);

    // localStorage 삭제가 완전히 반영되도록 강제로 동기화
    // 그리고 navigation 진행
    const method = pendingMethod!;

    // localStorage에 선택된 방법 저장
    localStorage.setItem(RECENT_METHOD_KEY, method);
    setRecentMethod(method);
    toNext();

    // 직접 navigation (proceedWithMethod 대신)
    if (method === "direct") {
      navigate("/care-sheet/new/info");
    } else {
      navigate("/care-sheet/new/ocr");
    }
  };

  // 기록지 클릭 핸들러
  const handleCareSheetClick = (date: YearMonthDay, memberId: number) => {
    setSelectedCareSheet({ date, memberId });
  };

  return (
    <>
      <div className={careSheetPageContainer}>
        <Header />
        <div className={careSheetPageContent}>
          <div className={careSheetPageContentTitleContainer}>
            <HighlightingHeading text={`${staffName}님!`} />
          </div>
          <Body type="large" weight={600} color={COLORS.gray[800]}>
            어떻게 기록지를 작성할까요?
          </Body>
          <WritingMethodCard
            title="직접 입력"
            description="온라인으로 바로 활동 일지를 작성해요"
            image={selectMethod}
            isSelected={recentMethod === "direct"}
            onClick={() => handleMethodSelect("direct")}
          />
          <WritingMethodCard
            title="사진 등록"
            description="손으로 직접 쓴 활동일지를 찍고 업로드해요."
            image={pictureMethod}
            isSelected={recentMethod === "photo"}
            onClick={() => handleMethodSelect("photo")}
          />
          <div className={todayWritedCareSheetContainer}>
            <div
              className={todayWritedCareSheetTitle}
              onClick={() => {
                if (funnelState?.STEP_0?.writerId) {
                  navigate(
                    `/care-sheet/new/today/${funnelState?.STEP_0?.writerId}`
                  );
                } else {
                  navigate(`/care-sheet/new/today/${homeFunnelData?.writerId}`);
                }
              }}
            >
              <Body type="medium" weight={600} color={COLORS.gray[600]}>
                오늘 작성한 기록지
              </Body>
              <Icon
                name="chevronRight"
                width={24}
                height={24}
                color={COLORS.gray[50]}
                stroke={COLORS.gray[600]}
              />
            </div>
            {careSheetList?.map((careSheet) => (
              <CareSheetListItem
                key={careSheet.memberMeta.memberId}
                todayCareSheet={careSheet}
                onCareSheetClick={handleCareSheetClick}
              />
            ))}
          </div>
        </div>
      </div>
      <StepButtons onPrev={toPrev} />

      {/* 기존 데이터 확인 모달 */}
      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onCloseClick={handleStartNew}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleContinueExisting}
          title="기존 작성 데이터 발견"
          message="이미 작성하던 기록지가 존재합니다. 해당 기록지를 마저 작성할까요?"
          confirmText="계속 작성하기"
          cancelText="새로 시작하기"
          infoItems={[
            {
              label: "멤버 ID",
              value: checkExistingData().memberId || "알 수 없음",
            },
            {
              label: "멤버명",
              value: checkExistingData().memberName || "알 수 없음",
            },
            { label: "날짜", value: checkExistingData().date || "알 수 없음" },
          ]}
        />
      )}
    </>
  );
};
