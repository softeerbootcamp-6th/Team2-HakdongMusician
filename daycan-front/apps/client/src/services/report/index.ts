import { safeRequest } from "@daycan/api";
import type { TReport, TReportList } from "./types";
import type { YearMonth, YearMonthDay } from "@/types/date";
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

/**
 * 리포트 리스트 YYYYMM 조회
 * @author 홍규진
 */
export const getReportList = async (
  yyyymm: YearMonth
): Promise<TReportList> => {
  return await safeRequest.get<TReportList>(
    privateInstance,
    `member/report/${yyyymm}`
  );
};
