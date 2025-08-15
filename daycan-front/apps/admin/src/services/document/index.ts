import { safeRequest } from "@daycan/api";
import type { TDocumentByMonth, TDocumentCount } from "./types";
import type { YearMonth } from "@/types/date";
import { handleError } from "@/services/error/handleError";
import { privateInstance } from "../instance";

/**
 * 수급자 문서 월별 조회(기록지, 리포트 둘의 리스트를 조회합니다.)
 * @author 홍규진
 */
export const getDocumentByMonth = async (
  memberId: string,
  yyyymm: YearMonth
): Promise<TDocumentByMonth[]> => {
  try {
    const response = await safeRequest.get<TDocumentByMonth[]>(
      privateInstance,
      `/admin/document/${memberId}/${yyyymm}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve([]);
  }
};

/**
 * 각 문서별 개수 조회(사이드바 용)
 * @author 홍규진
 */
export const getDocumentCount = async (
  yyyymm: YearMonth
): Promise<TDocumentCount | null> => {
  try {
    const response = await safeRequest.get<TDocumentCount>(
      privateInstance,
      `/admin/document/count/${yyyymm}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};
