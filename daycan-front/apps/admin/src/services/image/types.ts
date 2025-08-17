export type TPresignExtension = "jpg" | "jpeg" | "png";

export type TPresignContentType = "image/jpeg" | "image/png" | "image/jpg";

export type TPresignRequest = {
  count: number;
  extension: TPresignExtension;
  contentType: TPresignContentType;
};

export type TPresignItem = {
  objectKey: string;
  uploadUrl: string;
  headers: Record<string, string[]>;
};
