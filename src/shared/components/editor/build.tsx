import {
  Autoformat,
  BlockQuote,
  Bold,
  CKBox,
  ClassicEditor,
  CloudServices,
  EasyImage,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableToolbar,
  TextTransformation,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { CustomUploadAdapter } from './uploader';

export class BuildedEditor extends ClassicEditor {
  static builtinPlugins = [
    Essentials,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    CKBox,
    CloudServices,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResizeEditing, 
    ImageResizeHandles,
    CustomUploadAdapter,
    Indent,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableToolbar,
    TextTransformation,
  ];

  static defaultConfig = {
    toolbar: {
      items: [
        ...['undo', 'redo'],
        // ...['|', 'heading'],
        ...['|', 'bold', 'italic'],
        ...['|', 'link', 'uploadImage', 'insertTable', 'blockQuote', 'mediaEmbed'],
        ...['|', 'bulletedList', 'numberedList', 'outdent', 'indent'],
      ],
      // ['undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList', 'uploadImage']
    },
    uploadData: {},
    image: {
      toolbar: [
        ...['imageStyle:inline', 'imageStyle:block', 'imageStyle:side'],
        ...['|', 'toggleImageCaption', 'imageTextAlternative'],
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    language: 'fa',
  };
}
