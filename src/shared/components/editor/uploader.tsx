import { getToken } from '@/api/utils';
import { fileManagerUrl } from '@/utils';
import { FileLoader, FileRepository, Plugin, UploadAdapter, UploadResponse } from 'ckeditor5';

const config = { uploadUrl: fileManagerUrl + 'v1/files' };

type UploadData = Schema<'UploadRequestDTO'>;

export class CustomUploadAdapter extends Plugin {
  static get requires() {
    return [FileRepository];
  }
  static get pluginName() {
    return 'CustomUploadAdapter';
  }
  init() {
    const uploadData = this.editor.config.get('uploadData') as UploadData;
    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader: FileLoader) => new Adapter(loader, uploadData);
  }
}

class Adapter implements UploadAdapter {
  private xhr?: XMLHttpRequest;
  constructor(private loader: FileLoader, private uploadData: UploadData) {}

  async upload(): Promise<UploadResponse> {
    const file = (await this.loader.file)!;
    const { promise, resolve, reject } = Promise.withResolvers<UploadResponse>();
    this.xhr = new XMLHttpRequest();

    const { xhr, loader } = this;

    xhr.open('POST', config.uploadUrl, true);
    xhr.responseType = 'json';

    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error && response.error.message ? response.error.message : genericErrorText);
      }
      const urls = response.url ? { default: response.url } : response.urls;
      resolve({ ...response, urls });
    });

    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        loader.uploadTotal = evt.total;
        loader.uploaded = evt.loaded;
      }
    });

    this.xhr.withCredentials = true;
    const data = new FormData();
    data.append('file', file);
    Object.entries(this.uploadData).forEach(([key, val]) => {
        data.append(key, String(val));
    });

    const { accessToken } = getToken();
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.send(data);

    return promise;
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
