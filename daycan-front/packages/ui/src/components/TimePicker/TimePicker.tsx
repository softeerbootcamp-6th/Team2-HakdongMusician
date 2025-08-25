import { useState, useRef, useEffect, UIEvent } from "react";
import {
  wrapper,
  label,
  wheels,
  overlay,
  ampmList,
  hmList,
  colon,
} from "./TimePicker.css";
import { active, inactive, ITEM_HEIGHT } from "./TimePicker.css";
import { Button } from "../Button";

const hours = Array.from(
  { length: 12 },
  (_, i) => `${(i + 1).toString().padStart(2, "0")}`
);

const minutes = Array.from(
  { length: 60 },
  (_, i) => `${i.toString().padStart(2, "0")}`
);

type AMPM = "오전" | "오후";

interface TimePickerProps {
  label?: string;
  defaultTime24?: string; // "HH:MM" 형태의 24시간 초기값
  onConfirm: (time24: string) => void; // 24시간 "HH:MM" 형태로 반환
}

export const TimePicker = ({
  label = "시작시간",
  defaultTime24 = "09:00",
  onConfirm,
}: TimePickerProps) => {
  // 24시간 → 12시간 변환
  const parseTime24 = (time24: string) => {
    const [hStr, mStr] = time24.split(":");
    const hNum = Number(hStr);
    const amPm = hNum >= 12 ? "오후" : "오전";
    const hour12 = ((hNum + 11) % 12) + 1;
    return {
      hour: String(hour12).padStart(2, "0"),
      minute: String(mStr || "00").padStart(2, "0"),
      amPm,
    };
  };

  const initialTime = parseTime24(defaultTime24);
  const [ampm, setAmPm] = useState<AMPM>(initialTime.amPm as AMPM);
  const [hour, setHour] = useState<string>(initialTime.hour);
  const [minute, setMinute] = useState<string>(initialTime.minute);

  const hRef = useRef<HTMLUListElement>(null);
  const mRef = useRef<HTMLUListElement>(null);
  const ampmRef = useRef<HTMLUListElement>(null);

  const snapScroll =
    (
      ref: React.RefObject<HTMLUListElement | null>,
      cb: (val: string) => void
    ) =>
    (e: UIEvent<HTMLUListElement>) => {
      const el = ref.current;
      if (!el) return;
      const center = el.scrollTop + el.clientHeight / 2;
      const items = Array.from(el.children) as HTMLLIElement[];
      const nearest = items.reduce((prev, curr) => {
        const currCenter = curr.offsetTop + curr.clientHeight / 2;
        const prevCenter = prev.offsetTop + prev.clientHeight / 2;
        return Math.abs(currCenter - center) < Math.abs(prevCenter - center)
          ? curr
          : prev;
      });
      cb(nearest.dataset.value!);
    };

  useEffect(() => {
    hRef.current?.scrollTo({
      top: hours.indexOf(initialTime.hour) * ITEM_HEIGHT,
    });
    mRef.current?.scrollTo({
      top: minutes.indexOf(initialTime.minute) * ITEM_HEIGHT,
    });
    ampmRef.current?.scrollTo({
      top: ["오전", "오후"].indexOf(initialTime.amPm) * ITEM_HEIGHT,
    });
  }, [defaultTime24]);

  const handleConfirm = () => {
    // 12시간 → 24시간 변환
    let hNum = Number(hour);
    if (ampm === "오후" && hNum !== 12) {
      hNum += 12;
    } else if (ampm === "오전" && hNum === 12) {
      hNum = 0;
    }

    const time24 = `${String(hNum).padStart(2, "0")}:${minute.padStart(2, "0")}`;
    onConfirm(time24);
  };

  return (
    <div className={wrapper}>
      <p className={label}>{label}</p>

      <div className={wheels}>
        <div className={overlay} />
        {/* 오전/오후 */}
        <ul
          ref={ampmRef}
          className={ampmList}
          onScroll={snapScroll(ampmRef, (value) => setAmPm(value as AMPM))}
        >
          {["오전", "오후"].map((v) => (
            <li
              key={v}
              className={v === ampm ? active : inactive}
              data-value={v}
            >
              {v}
            </li>
          ))}
        </ul>

        {/* 시간 */}
        <ul ref={hRef} className={hmList} onScroll={snapScroll(hRef, setHour)}>
          {hours.map((h) => (
            <li
              key={h}
              data-value={h}
              className={h === hour ? active : inactive}
            >
              {h}
            </li>
          ))}
        </ul>

        <span className={colon}>:</span>

        {/* 분 */}
        <ul
          ref={mRef}
          className={hmList}
          onScroll={snapScroll(mRef, setMinute)}
        >
          {minutes.map((m) => (
            <li
              key={m}
              data-value={m}
              className={m === minute ? active : inactive}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>

      <Button variant="primary" size="fullWidth" onClick={handleConfirm}>
        확인
      </Button>
    </div>
  );
};
