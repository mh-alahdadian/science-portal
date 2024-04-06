import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './editor.css';
import { ComponentPropsWithoutRef, PropsWithoutRef } from 'react';

interface Props extends Omit<ComponentPropsWithoutRef<typeof CKEditor>, 'editor'> {}

export default function Editor(props: Props) {
  return (
    <div className="contents prose">
      <CKEditor
        config={{
          language: 'fa',
          // textPartLanguage: [
          //   { title: 'Arabic', languageCode: 'ar' },
          //   { title: 'French', languageCode: 'fr' },
          //   { title: 'Hebrew', languageCode: 'he' },
          //   { title: 'Spanish', languageCode: 'es' },
          // ],
        }}
        editor={ClassicEditor}
        {...props}
      />
    </div>
  );
}
