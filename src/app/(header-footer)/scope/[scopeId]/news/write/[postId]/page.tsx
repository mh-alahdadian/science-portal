'use client';

import { mutateService, queryService } from '@/api';
import { Editor, SelectField, TextField } from '@/components';
import { ModelType } from '@/constants';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { last } from 'ramda';
import { useState } from 'react';

export default function WriteNews({ params }: PageProps<'scopeId' | 'postId?'>) {
  const { data: categories } = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/categories', { params: { path: params } }),
  );
  const postIdOrDraft = last(usePathname().split('/'));
  const isDraft = postIdOrDraft === 'draft';
  const postId = !isDraft ? Number(postIdOrDraft) : (undefined as any as number);
  // const router = useRouter();
  const postService = queryService('news:/v1/manager/{page}/posts/{postId}', {
    params: { path: { page: String(params.scopeId), postId } },
  });

  const { mutateAsync: mutateCreatePost } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts'));
  const { mutateAsync: mutateEditPost } = useMutation({
    ...mutateService('put', 'news:/v1/manager/{page}/posts/{postId}'),
    mutationKey: postService.queryKey,
  });

  const post = useQuery({
    ...postService,
    enabled: !isDraft,
  }).data;

  const [editorData, setEditorData] = useState(post?.content || '');
  const [title, setTitle] = useState(post?.title || '');
  const [category, setCategory] = useState<string>(post ? String(post.categoryId) : '');

  function onBlur() {
    if (title && category) {
      const data: Parameters<typeof mutateCreatePost & typeof mutateEditPost>[0] = {
        params: { path: { page: String(params.scopeId), postId } },
        body: {
          title: title,
          categoryId: Number(category),
          isPublic: true,
          content: editorData,
        },
      };
      if (isDraft) {
        mutateCreatePost(data).then((post) => {
          history.replaceState(null, '', './' + post.id);
        });
      } else {
        mutateEditPost(data);
      }
    }
  }

  function handleEditorChange(data: any) {
    // mutateCreatePost()
    setEditorData(data);
  }

  return (
    <>
      <h1 className="my-8 text-lg">ایجاد خبر</h1>
      <TextField name="title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={onBlur} />
      <SelectField
        onChange={(e) => {
          setCategory(e.target.value);
          onBlur();
        }}
        onBlur={onBlur}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </SelectField>
      <Editor
        uploadData={{ scopeId: params.scopeId, modelTypeId: ModelType.NEWS, modelId: postId }}
        data={editorData}
        onChange={(event, editor) => handleEditorChange(editor.getData())}
        onBlur={onBlur}
        disabled={isDraft}
      />
      <Link className="btn-primary mt-5" href={'../' + post?.id}>
        ثبت خبر
      </Link>
    </>
  );
}
