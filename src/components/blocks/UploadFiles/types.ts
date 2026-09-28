export type UploadFilesRejectReason = "type" | "size" | "limit";

export type UploadFilesRejection = {
  file: File;
  reason: UploadFilesRejectReason;
};

export type UploadFilesProps = {
  multiple?: boolean;
  accept?: string;
  /** Maximum size of a single file in bytes. */
  maxSize?: number;
  /** Maximum number of files in the list. */
  maxFiles?: number;
  disabled?: boolean;
  title?: string;
  subtext?: string;
  icon?: string;
  /** Shows image thumbnails instead of file type icons. */
  preview?: boolean;
};

export type UploadFilesEmits = {
  added: [files: File[]];
  removed: [file: File];
  rejected: [rejections: UploadFilesRejection[]];
};
