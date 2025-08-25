import envelopeImage from "@/assets/png/envelope.png";
import openedEnvelopeImage from "@/assets/png/envelope_opened.png";
import {
  greeting,
  greetingWithAnimation,
  envelopeImageStyle,
  envelopeImageWithAnimation,
} from "../components/Greeting/Greeting.css";

// 상태별 메시지와 동작을 관리하는 객체
export const REPORT_STATUS_CONFIG = {
  true: {
    greetingMessage: "데일리 리포트가 도착했어요! 📬",
    modalTitle: "데일리 리포트가 도착했어요! 📬",
    modalContent: "새로운 리포트가 도착했어요! 📬",
    envelopeImage: envelopeImage,
    envelopeClassName: envelopeImageWithAnimation,
    containerClassName: greetingWithAnimation,
    action: "navigate" as const,
    showAgainButton: false,
  },
  false: {
    greetingMessage: "리포트를 이미 확인했어요! ✅",
    modalTitle: "리포트를 이미 확인했어요! ✅",
    modalContent:
      "오늘 리포트를 확인하셨다면, \n 그 날의 리포트는 하단의, 리포트 모아보기 버튼을 통해 확인할 수 있어요.",
    envelopeImage: openedEnvelopeImage,
    envelopeClassName: envelopeImageStyle,
    containerClassName: greeting,
    action: "showModal" as const,
    showAgainButton: true,
  },
  null: {
    greetingMessage: "오늘은 리포트가 없어요! 📅",
    modalTitle: "오늘은 리포트가 없어요! 📅",
    modalContent:
      "아직 리포트가 도착하지 않았거나, \n 수급자님이 출석하지 않았어요. 오늘 리포트가 도착하면 문자로 알려드릴게요.",
    envelopeImage: openedEnvelopeImage,
    envelopeClassName: envelopeImageStyle,
    containerClassName: greeting,
    action: "showModal" as const,
    showAgainButton: false,
  },
  undefined: {
    greetingMessage: "오늘은 리포트가 없어요! 📅",
    modalTitle: "오늘은 리포트가 없어요! 📅",
    modalContent:
      "아직 리포트가 도착하지 않았거나, \n 수급자님이 출석하지 않았어요.",
    envelopeImage: openedEnvelopeImage,
    envelopeClassName: envelopeImageStyle,
    containerClassName: greeting,
    action: "showModal" as const,
    showAgainButton: false,
  },
} as const;
