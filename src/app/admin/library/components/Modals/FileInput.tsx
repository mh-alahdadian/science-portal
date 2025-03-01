import { uploadFile } from '@/components/editor/uploader';
import { ChangeEvent } from 'react';

function FileInput({ setImage, image, modalData }: any) {
  let fileKey = modalData.id ? modalData.original.fileKey : '';

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { promise } = uploadFile(event.target.files![0], { scopeId: 0, modelTypeId: 6, modelId: undefined });

    promise.then((data) => setImage(data.fileName));
  }

  return (
    <>
      <div
        className="flex flex-col flex-1 border items-center justify-center bg-sand py-3.5 rounded-md shadow-inner max-w-52.5"
        style={{ borderColor: 'lightgray' }}
      >
        {image ? (
          modalData.original?.coverImage ? (
            <label htmlFor="image">
              <img
                src={`http://cogcenter.ir/api/fs/v1/files/download/${image}?key=${fileKey}`}
                alt=""
                className=" max-h-52"
              />
            </label>
          ) : (
            <label htmlFor="image">
              <img
                src={`http://cogcenter.ir/api/fs/v1/files/download/${image}?key=${fileKey}`}
                alt=""
                className=" max-h-52"
              />
            </label>
          )
        ) : (
          <label htmlFor="image" className="cursor-pointer opacity-70 text-sm p-5">
            انتخاب عکس
          </label>
        )}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default FileInput;
