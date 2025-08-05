import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { Button } from "../Button";
import { COLORS } from "../../styles";

// 한국어 로케일 등록
registerLocale("ko", ko);

export interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  initialDate?: Date;
  className?: string;
}

export const Calendar = ({
  onDateSelect,
  onConfirm,
  initialDate = new Date(),
  className,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  const handleConfirm = () => {
    onConfirm?.(selectedDate);
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
          dayClassName={(date) => {
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();

            let className = "";
            if (isSelected) className += " daycan-selected";
            if (isToday) className += " daycan-today";
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
