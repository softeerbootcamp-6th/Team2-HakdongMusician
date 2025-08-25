import { Body, Button, Heading, Modal } from "@daycan/ui";
import { COLORS } from "@daycan/ui";
import {
  reserveSendModalContainer,
  reserveSendModalButtonContainer,
  timeSelectionContainer,
  timeSelectGroup,
} from "./ReserveSendModal.css";
import { CustomTimeSelect } from "../CustomTimeSelect";
import type { TTime, YearMonthDay } from "@/types/date";
import { useReserveSendModal } from "./useReserveSendModal";

interface ReserveSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (reserveTime?: TTime, reserveDate?: YearMonthDay) => void;
}

export const ReserveSendModal = ({
  isOpen,
  onClose,
  onSend,
}: ReserveSendModalProps) => {
  const {
    selectedPeriod,
    selectedHour,
    selectedMinute,
    setSelectedPeriod,
    setSelectedHour,
    setSelectedMinute,
    getReserveDateDisplay,
    handleSend,
    PERIOD_OPTIONS,
    HOUR_OPTIONS,
    MINUTE_OPTIONS,
  } = useReserveSendModal();

  const handleSendClick = () => {
    handleSend(onSend);
  };

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

        {/* 예약 날짜 표시 */}
        <Body type="medium" weight={400} color={COLORS.gray[900]}>
          📅 예약 날짜: {getReserveDateDisplay()}
        </Body>

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
            onClick={handleSendClick}
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
