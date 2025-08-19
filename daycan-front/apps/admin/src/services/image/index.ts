import { safeRequest } from "@daycan/api";
import { privateInstance } from "@/services/instance";
import type {
  TPresignExtension,
  TPresignItem,
  TPresignRequest,
  TPresignContentType,
} from "./types";

/**
 * 여러 장 업로드용 presigned URL 배치 발급 (OCR 등)
 * @param count 업로드할 이미지 개수
 * @param extension 이미지 확장자
 * @param contentType 이미지 컨텐츠 타입
 * @returns 업로드용 presigned URL 배치
 * @author 홍규진
 */
export async function getPresignList({
  count,
  extension,
  contentType,
}: TPresignRequest): Promise<TPresignItem[]> {
  // body 없이 query만 넣는 POST
  return await safeRequest.post<TPresignItem[]>(
    privateInstance,
    "/admin/images/presign/list",
    undefined,
    {
      params: { count, extension, contentType },
    }
  );
}

export async function getPresign(
  extension: TPresignExtension,
  contentType: TPresignContentType
) {
  return await safeRequest.post<TPresignItem>(
    privateInstance,
    "/admin/images/presign/single",
    undefined,
    {
      params: { extension, contentType },
    }
  );
}

/**
 * Headers 를 배열로 받아와 이를 다시 평탄화 하는 함수
 * @param headers 평탄화 할 헤더 객체
 * @param contentType 헤더에 추가할 컨텐츠 타입
 * @returns 평탄화 된 헤더 객체
 * @author 홍규진
 */
function flattenHeaders(
  headers: Record<string, string[]>,
  contentType: string
): Headers {
  const h = new Headers();
  // presigned에 포함된 헤더들
  Object.entries(headers).forEach(([k, arr]) => {
    if (arr && arr.length > 0) h.set(k, arr[0]);
  });
  // Content-Type은 presign 서명 시 사용한 값과 동일해야 함
  if (!h.has("content-type") && !h.has("Content-Type")) {
    h.set("Content-Type", contentType);
  }
  return h;
}

/**
 * S3 업로드 함수
 * @param item 업로드할 이미지 정보
 * @param file 업로드할 파일
 * @returns 업로드 결과
 * @author 홍규진
 */
export async function putToS3(
  item: TPresignItem,
  file: File
): Promise<{ objectKey: string; etag: string | null }> {
  const response = await fetch(item.uploadUrl, {
    method: "PUT",
    headers: flattenHeaders(item.headers, file.type),
    body: file,
  });
  if (!response.ok) {
    throw new Error(
      `S3 upload failed: ${response.status} ${response.statusText}`
    );
  }
  const etag = response.headers.get("ETag");
  return { objectKey: item.objectKey, etag };
}

/**
 * 이미지 업로드 함수
 * @param files 업로드할 이미지 파일 배열
 * @returns 업로드 결과
 * @author 홍규진
 */
export async function uploadImages(files: File[]) {
  if (!files.length) return [];

  // ⚠️ 한 번의 presign 호출이 단일 extension/contentType 기준이므로,
  // 서로 다른 타입이면 그룹핑해서 presign을 여러 번 호출하세요.
  const extension = files[0].name.split(".").pop() as TPresignExtension;
  const contentType = files[0].type as TPresignContentType;

  const items = await getPresignList({
    count: files.length,
    extension,
    contentType,
  });

  if (items.length !== files.length) {
    throw new Error("Presign count mismatch");
  }
  const results = await Promise.allSettled(
    files.map((file, i) => putToS3(items[i], file))
  );

  // 성공만 추려서 key 리스트 반환
  const success = results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean) as { objectKey: string; etag: string | null }[];

  return success;
}

export async function uploadSingleImage(file: File) {
  // ⚠️ 한 번의 presign 호출이 단일 extension/contentType 기준이므로,
  // 서로 다른 타입이면 그룹핑해서 presign을 여러 번 호출하세요.
  const extension = file.name.split(".").pop() as TPresignExtension;
  const contentType = file.type as TPresignContentType;

  const item = await getPresign(extension, contentType);

  return await putToS3(item, file);
}
