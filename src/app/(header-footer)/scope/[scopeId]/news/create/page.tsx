'use client';

import { mutateService, queryService } from '@/api';
import { SelectField, TextField } from '@/components';
import Editor from '@/components/editor/Editor';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function CreateNews({ params }: PageProps<'scopeId' | 'id'>) {
  const { data: categories } = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/categories', { params: { path: params } }),
  );
  const { mutate: mutateCreatePost } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts'));

  const [editorData, setEditorData] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>(String(categories[0]?.id));

  function handleEditorChange(data: any) {
    setEditorData(data);
  }

  function handleSubmit() {
    mutateCreatePost({
      params: { path: { page: String(params.scopeId) } },
      body: {
        title: title,
        coverImage: '94',
        categoryId: Number(category),
        content: editorData,
        isPublic: true,
      },
    });
  }

  return (
    <>
      <h1 className="my-8 text-lg">ایجاد خبر</h1>
      <TextField name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <SelectField onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </SelectField>
      <Editor disabled={false} onChange={(event, editor) => handleEditorChange(editor.getData())} />
      <button className="btn-primary mt-5" onClick={handleSubmit}>
        ثبت خبر
      </button>
    </>
  );
}
