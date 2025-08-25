import { useState } from "react";
import type { TTime, YearMonthDay } from "@/types/date";
import { formatYYYYMMDD } from "@/utils/dateFormatter";

export const useReserveSendModal = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("오전");
  const [selectedHour, setSelectedHour] = useState("8시");
  const [selectedMinute, setSelectedMinute] = useState("00분");

  // 24시간 형식으로 변환하는 함수
  const convertTo24HourFormat = (): TTime => {
    let hour = parseInt(selectedHour.replace("시", ""));
    if (selectedPeriod === "오후" && hour !== 12) {
      hour += 12;
    } else if (selectedPeriod === "오전" && hour === 12) {
      hour = 0;
    }

    const minute = parseInt(selectedMinute.replace("분", ""));
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}` as TTime;
  };

  // 예약 날짜 계산 함수
  const calculateReserveDate = (): YearMonthDay => {
    const today = new Date();
    let reserveDate: Date;

    if (selectedPeriod === "오전") {
      // 오전이면 다음 날
      reserveDate = new Date(today);
      reserveDate.setDate(today.getDate() + 1);
    } else {
      // 오후면 당일
      reserveDate = today;
    }

    return formatYYYYMMDD(reserveDate) as YearMonthDay;
  };

  // 예약 날짜와 시간 표시용 텍스트 생성
  const getReserveDateDisplay = (): string => {
    const today = new Date();
    let reserveDate: Date;

    if (selectedPeriod === "오전") {
      reserveDate = new Date(today);
      reserveDate.setDate(today.getDate() + 1);
    } else {
      reserveDate = today;
    }

    const todayStr = today.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
    const tomorrowStr = reserveDate.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });

    // 시간 형식 변환
    let hour = parseInt(selectedHour.replace("시", ""));
    if (selectedPeriod === "오후" && hour !== 12) {
      hour += 12;
    } else if (selectedPeriod === "오전" && hour === 12) {
      hour = 0;
    }
    const minute = selectedMinute.replace("분", "");
    const timeDisplay = `${hour.toString().padStart(2, "0")}:${minute}`;

    if (selectedPeriod === "오전") {
      return `다음 날 (${tomorrowStr}) ${timeDisplay}`;
    } else {
      return `오늘 (${todayStr}) ${timeDisplay}`;
    }
  };

  // 전송 처리 함수
  const handleSend = (
    onSend: (reserveTime?: TTime, reserveDate?: YearMonthDay) => void
  ) => {
    const time24Format = convertTo24HourFormat();
    const reserveDateString = calculateReserveDate();

    console.log("예약된 날짜:", reserveDateString);
    console.log("예약된 시간:", time24Format);

    onSend(time24Format, reserveDateString);
  };

  // 시간 옵션들
  const PERIOD_OPTIONS = [
    { value: "오전", label: "오전" },
    { value: "오후", label: "오후" },
  ];

  const HOUR_OPTIONS = [
    { value: "8시", label: "8시" },
    { value: "9시", label: "9시" },
    { value: "10시", label: "10시" },
    { value: "11시", label: "11시" },
  ];

  const MINUTE_OPTIONS = [
    { value: "00분", label: "00분" },
    { value: "30분", label: "30분" },
  ];

  return {
    // 상태
    selectedPeriod,
    selectedHour,
    selectedMinute,

    // 상태 변경 함수들
    setSelectedPeriod,
    setSelectedHour,
    setSelectedMinute,

    // 계산된 값들
    getReserveDateDisplay,

    // 액션 함수
    handleSend,

    // 옵션들
    PERIOD_OPTIONS,
    HOUR_OPTIONS,
    MINUTE_OPTIONS,
  };
};
