export const fileManagerUrl = require('src/config').file_manger_url;

export function createFileUrl(key: string | undefined) {
    return `${fileManagerUrl}v1/files/download?key=${key}`
}
