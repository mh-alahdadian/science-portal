import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './editor.css';

interface Props {}

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
        data="<h1>Hello from CKEditor&nbsp;5!</h1> <p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          editor.sourceElement!.classList.add('prose');
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event) => {
          console.log(event);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
}
