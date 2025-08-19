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
  } = useHistoryModal(memberId);

  // ===== 선택된 데이터 타입 상태 =====
  const [selectedDataType, setSelectedDataType] = useState<
    "report" | "careSheet" | null
  >(null);

  const handleViewReport = (date: YearMonthDay) => {
    setSelectedDataType("report");

    fetchReportData(date, memberId);
  };

  const handleViewCareSheet = (careSheetId: number) => {
    setSelectedDataType("careSheet");
    fetchCareSheetData(careSheetId);
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
              {documentList?.map((document) => {
                const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
                  new Date(document.documentDate).getDay()
                ];
                const isWeekend = dayOfWeek === "일" || dayOfWeek === "토";

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
                          color="blue"
                          round="s"
                          style={{ padding: "6px 8px" }}
                        >
                          작성 완료
                        </Chip>

                        <button
                          className={confirmButton}
                          onClick={() =>
                            handleViewCareSheet(document.careSheet.careSheetId)
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
                          color="blue"
                          round="s"
                          style={{ padding: "6px 8px" }}
                        >
                          전송 완료
                        </Chip>
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
                <ReportDataView reportData={reportData} />
              ) : (
                <CareSheetDataView careSheetData={careSheetData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
