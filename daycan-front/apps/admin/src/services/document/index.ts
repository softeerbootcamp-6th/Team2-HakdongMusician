import { safeRequest } from "@daycan/api";
import type { TDocumentByMonth, TDocumentCount } from "./types";
import type { YearMonth, YearMonthDay } from "@/types/date";
import { privateInstance } from "../instance";

/**
 * 수급자 문서 월별 조회(기록지, 리포트 둘의 리스트를 조회합니다.)
 * @author 홍규진
 */
export const getDocumentByMonth = async (
  memberId: number,
  yyyymm: YearMonth
): Promise<TDocumentByMonth[]> => {
  return await safeRequest.get<TDocumentByMonth[]>(
    privateInstance,
    `/admin/document/${memberId}/${yyyymm}`
  );
};

/**
 * 각 문서별 개수 조회(사이드바 용)
 * @author 홍규진
 */
export const getDocumentCount = async (
  yyyymmdd: YearMonthDay
): Promise<TDocumentCount | null> => {
  return await safeRequest.get<TDocumentCount>(
    privateInstance,
    `/admin/document/count/${yyyymmdd}`
  );
};
