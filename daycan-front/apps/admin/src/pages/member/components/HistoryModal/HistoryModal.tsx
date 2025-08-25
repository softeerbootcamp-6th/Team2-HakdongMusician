import { Body, Chip, COLORS, Icon, Modal } from "@daycan/ui";
import {
  historyModalContainer,
  historyModalHeader,
  historyModalHeaderLeft,
  historyModalHeaderRight,
  historyModalHeaderDateSelect,
  historyModalContentContainer,
  historyModalContentLeft,
  historyModalContentRight,
  historyModalHeaderRightProfile,
  dateSelectContainer,
  monthSelector,
  monthButton,
  dateStatusListContainer,
  dateStatusItem,
  dateStatusHeader,
  dateStatusContent,
  statusItem,
  confirmButton,
  reportContainer,
} from "./HistoryModal.css";
import { useState } from "react";

import { useHistoryModal } from "./useHistoryModal";
import { ReportDataView } from "@/components/ReportDataView";
import { CareSheetDataView } from "@/components/CareSheetDataView";
import { TODAY_YYYYMM } from "@/utils/dateFormatter";
import type { YearMonthDay } from "@/types/date";
import { getStatusInfo } from "@/pages/report/utils/parser";
import type { TReportStatus } from "@/services/report/types";

interface HistoryModalProps {
  memberId: number;
  memberName: string;
  memberProfileImage: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal = ({
  memberId,
  memberName,
  memberProfileImage,
  isOpen,
  onClose,
}: HistoryModalProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date(TODAY_YYYYMM));

  const {
    reportData,
    careSheetData,
    fetchReportData,
    fetchCareSheetData,
    documentList,
  } = useHistoryModal(memberId, selectedMonth);

  // ===== 선택된 데이터 타입 상태 =====
  const [selectedDataType, setSelectedDataType] = useState<
    "report" | "careSheet" | null
  >(null);

  const handleViewReport = (date: YearMonthDay) => {
    setSelectedDataType("report");

    fetchReportData(date, memberId);
  };

  const handleViewCareSheet = (date: YearMonthDay, memberId: number) => {
    setSelectedDataType("careSheet");
    fetchCareSheetData(date, memberId);
  };

  const changeMonth = (direction: "prev" | "next") => {
    setSelectedMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
    // 월이 변경되면 선택된 데이터 타입 초기화
    setSelectedDataType(null);
  };

  // 리포트 상태에 따른 표시 정보 가져오기
  const getReportStatusDisplay = (status: TReportStatus) => {
    const statusInfo = getStatusInfo(status);

    // Chip 컴포넌트가 지원하는 색상으로 매핑
    const getChipColor = (
      color: string
    ): "red" | "yellow" | "green" | "blue" | "grayDark" => {
      if (color === COLORS.red[500]) return "red";
      if (color === COLORS.yellow[500]) return "yellow";
      if (color === COLORS.green[500]) return "green";
      if (color === COLORS.blue[500]) return "blue";
      return "grayDark";
    };

    return {
      text: statusInfo.text,
      color: getChipColor(statusInfo.color),
    };
  };

  // 케어시트 상태에 따른 표시 정보 가져오기
  const getCareSheetStatusDisplay = (status: string) => {
    switch (status) {
      case "NOT_APPLICABLE":
        return { text: "미출석", color: "red" as const };
      case "PENDING":
        return { text: "작성 필요", color: "yellow" as const };
      case "DONE":
        return { text: "작성 완료", color: "green" as const };
      case "REVIEWED":
        return { text: "검토 완료", color: "blue" as const };
      default:
        return { text: "작성 필요", color: "yellow" as const };
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={historyModalContainer}>
        <div className={historyModalHeader}>
          <div className={historyModalHeaderLeft}>
            <Icon
              name="smallLogo"
              width={32}
              height={32}
              color={COLORS.white}
            />
            <Body type="large" weight={500} color={COLORS.white}>
              기록지 리포트 내역
            </Body>
          </div>
          <div className={historyModalHeaderRight}>
            <img
              src={memberProfileImage}
              alt="프로필"
              className={historyModalHeaderRightProfile}
            />
            <Body type="xsmall" weight={500} color={COLORS.white}>
              {memberName}
            </Body>
          </div>
        </div>

        <div className={historyModalHeaderDateSelect}>
          <div className={dateSelectContainer}>
            <button className={monthButton} onClick={() => changeMonth("prev")}>
              <Icon
                name="chevronLeft"
                width={16}
                height={16}
                color={COLORS.gray[600]}
              />
            </button>
            <div className={monthSelector}>
              <Body type="medium" weight={600} color={COLORS.gray[900]}>
                {selectedMonth.getFullYear()}년 {selectedMonth.getMonth() + 1}월
              </Body>
            </div>
            <button className={monthButton} onClick={() => changeMonth("next")}>
              <Icon
                name="chevronRight"
                width={16}
                height={16}
                color={COLORS.gray[600]}
              />
            </button>
          </div>
        </div>

        {/* 왼쪽 영역 */}
        <div className={historyModalContentContainer}>
          <div className={historyModalContentLeft}>
            <Body type="medium" weight={600} color={COLORS.gray[900]}>
              일별 기록 현황
            </Body>
            <div className={dateStatusListContainer}>
              {/* 데이터가 없을 경우 */}
              {documentList?.length === 0 && (
                <div className={dateStatusItem}>
                  <Body type="small" weight={600} color={COLORS.gray[900]}>
                    해당 달에는 기록이 없습니다.
                  </Body>
                </div>
              )}
              {documentList?.map((document) => {
                const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
                  new Date(document.documentDate).getDay()
                ];
                const isWeekend = dayOfWeek === "일" || dayOfWeek === "토";

                // 리포트 상태 정보 가져오기
                const reportStatusInfo = getReportStatusDisplay(
                  document.careReport.status
                );

                // 케어시트 상태 정보 가져오기
                const careSheetStatusInfo = getCareSheetStatusDisplay(
                  document.careSheet.status
                );

                // careSheetId나 reportId가 null인지 확인
                const hasCareSheet = document.careSheet.careSheetId !== null;
                const hasReport = document.careReport.careReportId !== null;

                return (
                  <div key={document.documentDate} className={dateStatusItem}>
                    <div className={dateStatusHeader}>
                      <Body
                        type="small"
                        weight={600}
                        color={isWeekend ? COLORS.red[500] : COLORS.gray[900]}
                      >
                        {new Date(document.documentDate).getFullYear()}년{" "}
                        {new Date(document.documentDate).getMonth() + 1}월{" "}
                        {new Date(document.documentDate).getDate()}일 (
                        {dayOfWeek})
                      </Body>

                      <Chip
                        color="green"
                        round="s"
                        style={{ padding: "6px 8px" }}
                      >
                        출석
                      </Chip>
                    </div>

                    <div className={dateStatusContent}>
                      <div className={statusItem}>
                        <Body
                          type="xsmall"
                          weight={500}
                          color={COLORS.gray[700]}
                        >
                          기록지
                        </Body>

                        <Chip
                          color={careSheetStatusInfo.color}
                          round="s"
                          style={{ padding: "6px 8px" }}
                        >
                          {careSheetStatusInfo.text}
                        </Chip>

                        {hasCareSheet && (
                          <button
                            className={confirmButton}
                            onClick={() =>
                              handleViewCareSheet(
                                document.documentDate,
                                memberId
                              )
                            }
                          >
                            <Body
                              type="xsmall"
                              weight={500}
                              color={COLORS.gray[600]}
                            >
                              확인 &gt;
                            </Body>
                          </button>
                        )}
                      </div>

                      <div className={statusItem}>
                        <Body
                          type="xsmall"
                          weight={500}
                          color={COLORS.gray[700]}
                        >
                          리포트
                        </Body>
                        <Chip
                          color={reportStatusInfo.color}
                          round="s"
                          style={{ padding: "6px 8px" }}
                        >
                          {reportStatusInfo.text}
                        </Chip>
                        {hasReport && (
                          <button
                            className={confirmButton}
                            onClick={() =>
                              handleViewReport(document.documentDate)
                            }
                          >
                            <Body
                              type="xsmall"
                              weight={500}
                              color={COLORS.gray[600]}
                            >
                              확인 &gt;
                            </Body>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className={historyModalContentRight}>
            <div className={reportContainer}>
              {!selectedDataType ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Body
                    type="medium"
                    weight={600}
                    color={COLORS.gray[900]}
                    style={{ marginBottom: "16px" }}
                  >
                    날짜를 선택해주세요
                  </Body>
                </div>
              ) : selectedDataType === "report" ? (
                <ReportDataView reportData={reportData ?? null} />
              ) : (
                <CareSheetDataView careSheetData={careSheetData ?? null} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
