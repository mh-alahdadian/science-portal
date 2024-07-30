export function createFileUrl(key: string | undefined): string;
export function createFileUrl(id: string | undefined, key: string | undefined): string;
export function createFileUrl(idKey: string | undefined, key?: string | undefined) {
  if (key) {
    return `/api/fs/v1/files/download/${idKey}?key=${key}`;
  }
  return `/api/fs/v1/files/download?key=${idKey}`;
}
