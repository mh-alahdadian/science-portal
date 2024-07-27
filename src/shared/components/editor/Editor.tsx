import { CKEditor } from '@ckeditor/ckeditor5-react';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { BuildedEditor } from './build';
import './editor.css';

interface Props extends Omit<ComponentPropsWithoutRef<typeof CKEditor>, 'editor'> {
  uploadData?: Partial<Omit<Schema<'UploadRequestDTO'>, 'file'>> & { fileKey?: string };
  readonly?: boolean;
  className?: string;
}

export default function Editor(props: Props) {
  return (
    <div className={clsx('contents prose', props.className)}>
      <CKEditor
        config={{
          toolbar: {
            removeItems: props.uploadData ? [] : ['uploadImage'],
            // items: props.disabled
            //   ? []
            //   : ['undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList', 'uploadImage'],
          },
          ...{
            uploadData: (props.uploadData || {}) as Schema<'UploadRequestDTO'>,
          },
        }}
        editor={BuildedEditor}
        onReady={(editor) => {
          const {
            toolbar: { element: toolbarElement },
            editable: { element: editableElement },
          } = editor.ui.view;
          if (props.readonly) {
            toolbarElement!.style.display = 'none';
            editableElement!.classList.remove('ck-editor__editable', 'ck-editor__editable_inline');
          }
        }}
        disabled={props.readonly || props.disabled}
        {...props}
        data={props.data?.replaceAll(/src="((?:\w|[/-])*)"/g, `src="/api/fs/$1?key=${props.uploadData?.fileKey}"`)}
      />
    </div>
  );
}
