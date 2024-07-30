import { getToken } from '@/api/utils';
import { FileLoader, FileRepository, Plugin, UploadAdapter, UploadResponse } from 'ckeditor5';

const config = { uploadUrl: '/api/fs/v1/files' };

type UploadData = Omit<Schema<'UploadRequestDTO'>, 'file'>;

export class CustomUploadAdapter extends Plugin {
  static get requires() {
    return [FileRepository];
  }
  static get pluginName() {
    return 'CustomUploadAdapter';
  }
  init() {
    const uploadData = this.editor.config.get('uploadData') as UploadData;
    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader: FileLoader) =>
      new Adapter(loader, uploadData);
  }
}

class Adapter implements UploadAdapter {
  private xhr?: XMLHttpRequest;
  constructor(
    private loader: FileLoader,
    private uploadData: UploadData,
  ) {}

  async upload(): Promise<UploadResponse> {
    const file = (await this.loader.file)!;

    const { xhr, promise } = uploadFile(data);
    this.xhr = xhr;

    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        this.loader.uploadTotal = evt.total;
        this.loader.uploaded = evt.loaded;
      }
    });

    return promise;
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

export function uploadFile(file: File, uploadData: UploadData) {
  const form = new FormData();
  form.append('file', file);
  for (const [key, val] of Object.entries(uploadData)) {
    form.append(key, String(val));
  }

  const { promise, resolve, reject } = Promise.withResolvers<Schema<'FileResponseDTO'>>();
  const xhr = new XMLHttpRequest();

  xhr.open('POST', config.uploadUrl, true);
  xhr.responseType = 'json';

  const genericErrorText = `Couldn't upload file.`;
  xhr.addEventListener('error', () => reject(genericErrorText));
  xhr.addEventListener('abort', () => reject());
  xhr.addEventListener('load', () => {
    const response = xhr.response;
    if (!response || response.error) {
      return reject(response?.error?.message || genericErrorText);
    }
    const urls = response.url ? { default: response.url } : response.urls;
    resolve({ ...response, urls });
  });

  xhr.withCredentials = true;

  const { accessToken } = getToken();
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xhr.send(form);

  return { xhr, promise };
}
