export const fileManagerUrl = require('src/config').file_manger_url;

export function createFileUrl(key: string | undefined): string;
export function createFileUrl(id: string | undefined, key: string | undefined): string;
export function createFileUrl(idKey: string | undefined, key?: string | undefined) {
  if (key) {
    return `${fileManagerUrl}v1/files/download/${idKey}?key=${key}`;
  }
  return `${fileManagerUrl}v1/files/download?key=${idKey}`;
}
