import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { Button } from "../Button";

// 한국어 로케일 등록
registerLocale("ko", ko);

export interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  onMonthChange?: (date: Date) => void; // 월 변경 이벤트
  initialDate?: Date;
  className?: string;
  availableDates?: Date[]; // 선택 가능한 날짜들
}

export const Calendar = ({
  onDateSelect,
  onConfirm,
  onMonthChange,
  initialDate = new Date(),
  className,
  availableDates = [],
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      // 선택 가능한 날짜인지 확인
      if (isDateSelectable(date)) {
        setSelectedDate(date);
        onDateSelect?.(date);
      }
    }
  };

  const handleConfirm = () => {
    onConfirm?.(selectedDate);
  };

  // 선택 가능한 날짜인지 확인하는 함수
  const isDateSelectable = (date: Date) => {
    if (availableDates.length === 0) return false; // availableDates가 없으면 모든 날짜 선택 불가능

    const isSelectable = availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString()
    );

    return isSelectable;
  };
  return (
    <div className={`calendar-container ${className || ""}`}>
      <div className="custom-date-picker">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale="ko"
          calendarClassName="daycan-calendar"
          onMonthChange={onMonthChange} // 월 변경 이벤트
          dayClassName={(date) => {
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const isAvailable = isDateSelectable(date);

            let className = "";
            if (isSelected) className += " daycan-selected";
            if (isToday) className += " daycan-today";
            if (!isAvailable) className += " daycan-disabled"; // 선택 불가능한 날짜 스타일
            return className;
          }}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="calendar-header-container">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="calendar-nav-button"
              >
                ‹
              </button>
              <span className="calendar-month-year">
                {date.getFullYear()}년 {date.getMonth() + 1}월
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="calendar-nav-button"
              >
                ›
              </button>
            </div>
          )}
        />
      </div>

      <div className="calendar-footer">
        <Button variant="primary" onClick={handleConfirm} size="fullWidth">
          확인
        </Button>
      </div>
    </div>
  );
};
