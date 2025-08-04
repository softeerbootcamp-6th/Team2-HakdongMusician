export const ICON_NAMES = {
  RECORD: "record",
  REPORT: "report",
  ELDER: "elder",
  WORKER: "worker",
  ARROW_RIGHT: "arrowRight",
} as const;

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];
