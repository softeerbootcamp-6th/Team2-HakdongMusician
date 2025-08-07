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

interface Props {
  defaultHour?: string;
  defaultMinute?: string;
  defaultAmPm?: AMPM;
  onConfirm: (h: string, m: string, ap: AMPM) => void;
}

export const TimePicker = ({
  defaultHour = "09",
  defaultMinute = "00",
  defaultAmPm = "오전",
  onConfirm,
}: Props) => {
  const [ampm, setAmPm] = useState<AMPM>(defaultAmPm);
  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute);

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
    hRef.current?.scrollTo({ top: hours.indexOf(defaultHour) * ITEM_HEIGHT });
    mRef.current?.scrollTo({
      top: minutes.indexOf(defaultMinute) * ITEM_HEIGHT,
    });
    ampmRef.current?.scrollTo({
      top: ["오전", "오후"].indexOf(defaultAmPm) * ITEM_HEIGHT,
    });
  }, [defaultHour, defaultMinute, defaultAmPm]);

  return (
    <div className={wrapper}>
      <p className={label}>시작시간</p>

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

      <Button
        variant="primary"
        size="fullWidth"
        onClick={() => {
          onConfirm(hour, minute, ampm);
        }}
      >
        확인
      </Button>
    </div>
  );
};
