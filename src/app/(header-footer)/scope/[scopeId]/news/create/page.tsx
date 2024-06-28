'use client';

import { EditorWidget } from '@/components/widgets';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
// import clsx from 'clsx';
// import './editor.css';
import Editor from '@/components/editor/Editor';
import { useMutation } from '@tanstack/react-query';
import { mutateService } from '@/api';


export default function CreateNews({ params }: PageProps<'scopeId' | 'id'>) {
    const [editorData, setEditorData] = useState("");

    const { mutate: mutateCreatePost } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts'));

    function handleEditorChange(data: any) {
        setEditorData(data)
    }

    function handleSubmit() {
        mutateCreatePost({params: {path: {page: String(params.scopeId)}}, 
        body: {
            content: editorData,
        }})
    }

    return (
        <>
            <h1 className='my-8 text-lg'>ایجاد خبر</h1>
            {/* <CKEditor
                
                editor={ClassicEditor}
                
                onChange={() => handleEditorChange()}
            /> */}

            <Editor disabled={false} onChange={(event, editor) => handleEditorChange(editor.getData())} />
            <button className='btn btn-primary mt-5' onClick={handleSubmit}>ثبت خبر</button>
        </>
    )

}
