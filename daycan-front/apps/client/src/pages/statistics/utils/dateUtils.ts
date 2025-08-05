export interface DateRange {
  start: string;
  end: string;
}

export const getDateRanges = (period: string): DateRange[] => {
  const today = new Date();
  const ranges: DateRange[] = [];

  switch (period) {
    case "1주일":
      // 현재 주부터 4주 전까지
      for (let i = 3; i >= 0; i--) {
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - i * 7 - today.getDay());
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        ranges.push({
          start: startDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
          end: endDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
        });
      }
      break;

    case "1개월":
      // 현재 월부터 3개월 전까지
      for (let i = 2; i >= 0; i--) {
        const startDate = new Date(
          today.getFullYear(),
          today.getMonth() - i,
          1
        );
        const endDate = new Date(
          today.getFullYear(),
          today.getMonth() - i + 1,
          0
        );

        ranges.push({
          start: startDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
          end: endDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
        });
      }
      break;

    case "6개월":
      // 현재 반기부터 이전 반기까지
      const currentYear = today.getFullYear();
      const currentHalf = today.getMonth() < 6 ? 1 : 2;

      for (let i = 1; i >= 0; i--) {
        const half = currentHalf - i;
        const year = half <= 0 ? currentYear - 1 : currentYear;
        const adjustedHalf = half <= 0 ? 2 : half;

        const startDate = new Date(year, (adjustedHalf - 1) * 6, 1);
        const endDate = new Date(year, adjustedHalf * 6, 0);

        ranges.push({
          start: startDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
          end: endDate
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
        });
      }
      break;

    default:
      ranges.push({ start: "2025.07.29", end: "2025.08.04" });
  }

  return ranges;
};
