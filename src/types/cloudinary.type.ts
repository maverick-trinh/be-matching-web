export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export interface CloudinaryDestroyResult {
  result: string;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
}

export interface CloudinaryUploader {
  upload(
    file: string,
    options?: CloudinaryUploadOptions,
  ): Promise<CloudinaryUploadResult>;
  destroy(publicId: string): Promise<CloudinaryDestroyResult>;
}

export interface CloudinaryInstance {
  uploader: CloudinaryUploader;
}

export function isCloudinaryInstance(
  value: unknown,
): value is CloudinaryInstance {
  if (typeof value !== 'object' || value === null || !('uploader' in value)) {
    return false;
  }

  const uploader = (value as { uploader: unknown }).uploader;
  if (
    typeof uploader !== 'object' ||
    uploader === null ||
    !('upload' in uploader) ||
    !('destroy' in uploader)
  ) {
    return false;
  }

  const { upload, destroy } = uploader as {
    upload?: unknown;
    destroy?: unknown;
  };

  return typeof upload === 'function' && typeof destroy === 'function';
}
