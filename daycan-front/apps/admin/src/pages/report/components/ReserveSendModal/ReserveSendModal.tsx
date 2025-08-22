import { Body, Button, Heading, Modal } from "@daycan/ui";
import { COLORS } from "@daycan/ui";
import {
  reserveSendModalContainer,
  reserveSendModalButtonContainer,
  timeSelectionContainer,
  timeSelectGroup,
} from "./ReserveSendModal.css";
import { useState } from "react";
import { CustomTimeSelect, type TimeOption } from "../CustomTimeSelect";
import type { TTime } from "@/types/date";

interface ReserveSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (reserveTime?: TTime) => void;
}

export const ReserveSendModal = ({
  isOpen,
  onClose,
  onSend,
}: ReserveSendModalProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("오전");
  const [selectedHour, setSelectedHour] = useState("8시");
  const [selectedMinute, setSelectedMinute] = useState("00분");

  const handleSend = () => {
    // 24시간 형식으로 변환
    let hour = parseInt(selectedHour.replace("시", ""));
    if (selectedPeriod === "오후" && hour !== 12) {
      hour += 12;
    } else if (selectedPeriod === "오전" && hour === 12) {
      hour = 0;
    }

    const minute = parseInt(selectedMinute.replace("분", ""));
    const time24Format =
      `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}` as TTime;

    console.log("예약된 시간:", time24Format);
    onSend(time24Format);
  };

  const PERIOD_OPTIONS: TimeOption[] = [
    { value: "오전", label: "오전" },
    { value: "오후", label: "오후" },
  ];

  const HOUR_OPTIONS: TimeOption[] = [
    { value: "8시", label: "8시" },
    { value: "9시", label: "9시" },
    { value: "10시", label: "10시" },
    { value: "11시", label: "11시" },
  ];

  const MINUTE_OPTIONS: TimeOption[] = [
    { value: "00분", label: "00분" },
    { value: "30분", label: "30분" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={reserveSendModalContainer}>
        <Heading type="xsmall">전송을 예약할까요?</Heading>
        <Body type="medium" weight={400} color={COLORS.gray[600]}>
          검토 완료된 리포트를 예약한 시간에 한 번에 전송할 수 있어요!
        </Body>

        <div className={timeSelectionContainer}>
          <div className={timeSelectGroup}>
            <CustomTimeSelect
              options={PERIOD_OPTIONS}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              placeholder="오전/오후"
            />
            <CustomTimeSelect
              options={HOUR_OPTIONS}
              value={selectedHour}
              onChange={setSelectedHour}
              placeholder="시간"
            />
            <CustomTimeSelect
              options={MINUTE_OPTIONS}
              value={selectedMinute}
              onChange={setSelectedMinute}
              placeholder="분"
            />
          </div>
        </div>

        <div className={reserveSendModalButtonContainer}>
          <Button
            variant="unEmphasized"
            size="small"
            onClick={onClose}
            style={{
              width: 160,
              height: 52,
            }}
          >
            닫기
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleSend}
            style={{
              width: 160,
              height: 52,
            }}
          >
            전송 예약
          </Button>
        </div>
      </div>
    </Modal>
  );
};
