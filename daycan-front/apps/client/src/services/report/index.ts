import { safeRequest } from "@daycan/api";
import type { TReport } from "./types";
import type { YearMonthDay } from "@/types/date";
import { privateInstance } from "../instance";

/**
 * 리포트 단건 조회
 * @author 홍규진
 */
export const getReport = async (yyyymmdd: YearMonthDay): Promise<TReport> => {
  return await safeRequest.get<TReport>(
    privateInstance,
    `member/report/${yyyymmdd}`
  );
};
