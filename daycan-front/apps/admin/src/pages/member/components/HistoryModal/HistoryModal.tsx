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
import profileImg from "@/assets/images/profile.png";
import { useState } from "react";

import { useHistoryModal } from "./useHistoryModal";
import { ReportDataView } from "@/components/ReportDataView";
import { CareSheetDataView } from "@/components/CareSheetDataView";

interface HistoryModalProps {
  memberId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal = ({
  memberId = "1",
  isOpen,
  onClose,
}: HistoryModalProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const {
    historyData,
    careSheetData,
    isLoading,
    fetchHistoryData,
    fetchCareSheetData,
  } = useHistoryModal();

  const [selectedDataType, setSelectedDataType] = useState<
    "report" | "careSheet" | null
  >(null);

  const handleViewReport = async (date: Date) => {
    setSelectedDataType("report");
    console.log("handleViewReport", date, memberId);
    await fetchHistoryData(date, memberId);
  };

  const handleViewCareSheet = async (date: Date) => {
    setSelectedDataType("careSheet");
    console.log("handleViewCareSheet", date, memberId);
    await fetchCareSheetData(date, memberId);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
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
              src={profileImg}
              alt="프로필"
              className={historyModalHeaderRightProfile}
            />
            <Body type="xsmall" weight={500} color={COLORS.white}>
              {/*TODO - API 로 수정 */}
              김큐티빠띠할머니
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
              {getDaysInMonth(selectedMonth).map((date) => {
                const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
                  date.getDay()
                ];
                const isWeekend = dayOfWeek === "일" || dayOfWeek === "토";

                return (
                  <div key={date.getTime()} className={dateStatusItem}>
                    <div className={dateStatusHeader}>
                      <Body
                        type="small"
                        weight={600}
                        color={isWeekend ? COLORS.red[500] : COLORS.gray[900]}
                      >
                        {date.getFullYear()}년 {date.getMonth() + 1}월{" "}
                        {date.getDate()}일 ({dayOfWeek})
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
                          onClick={() => handleViewCareSheet(date)}
                          disabled={isLoading}
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
                          onClick={() => handleViewReport(date)}
                          disabled={isLoading}
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
              ) : isLoading ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Body
                    type="medium"
                    weight={600}
                    color={COLORS.gray[900]}
                    style={{ marginBottom: "16px" }}
                  >
                    데이터 로딩 중...
                  </Body>
                  <Body type="small" weight={400} color={COLORS.gray[600]}>
                    잠시만 기다려주세요...
                  </Body>
                </div>
              ) : selectedDataType === "report" ? (
                <ReportDataView reportData={historyData} />
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
