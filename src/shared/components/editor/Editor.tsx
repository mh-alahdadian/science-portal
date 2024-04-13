import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import './editor.css';

interface Props extends Omit<ComponentPropsWithoutRef<typeof CKEditor>, 'editor'> {
  className: string;
}

export default function Editor(props: Props) {
  return (
    <div className={clsx('contents prose', props.className)}>
      <CKEditor
        config={{
          language: 'fa',
          toolbar: {
            removeItems: ['heading'],
          },
        }}
        editor={ClassicEditor}
        onReady={(editor) => {
          const {
            toolbar: { element: toolbarElement },
            editable: { element: editableElement },
          } = editor.ui.view;
          if (props.disabled) {
            toolbarElement!.style.display = 'none';
            editableElement!.classList.remove('ck-editor__editable', 'ck-editor__editable_inline');
          }
        }}
        {...props}
      />
    </div>
  );
}
