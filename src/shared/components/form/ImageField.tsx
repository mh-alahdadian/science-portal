import { Image } from '@phosphor-icons/react';
import clsx from 'clsx';
import { HTMLAttributes, useState } from 'react';
import { ErrorCode, type FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

// import UploadImagePlaceholderIcon from 'src/assets/images/upload-image-placeholder.svg';
// import UploadImageIcon from 'src/assets/images/upload-image.svg';

interface Props extends HTMLAttributes<HTMLElement> {
  initialPreview?: string;
  setSelectedImage: (file: File) => void;
}

export function ImageField({ initialPreview, setSelectedImage, ...props }: Props) {
  const [selectedImagePreview, setSelectedImagePreview] = useState(initialPreview);

  // const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function onDrop(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImage(file);
          setSelectedImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function onDropRejected(fileRejections: FileRejection[]) {
    if (fileRejections[0].errors[0].code === ErrorCode.FileTooLarge) {
      toast.error('حجم فایل بیش از 1MB می‌باشد!');
    } else if (fileRejections[0].errors[0].code === ErrorCode.FileInvalidType) {
      toast.error('فرمت فایل نامعتبر می‌باشد!');
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 1 * 1024 * 1024, // 1MB
  });

  return (
    <>
      <div {...getRootProps()}>
        {selectedImagePreview ? (
          <img
            src={selectedImagePreview}
            {...props}
            className={clsx('w-full object-cover object-center', props.className)}
          />
        ) : (
          <label
            role="input"
            {...props}
            className={clsx(
              'flex flex-col justify-center items-center whitespace-nowrap',
              isDragActive && 'file-input-primary',
              props.className,
            )}
          >
            آپلود تصویر کاور
            <Image size={48} />
          </label>
        )}
        <input {...getInputProps()} />
      </div>
      {uploading && <progress className="mt-4" value={progress} max={100} />}
    </>
  );
}
