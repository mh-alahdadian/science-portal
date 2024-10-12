'use client';

import { mutateService, queryService } from '@/api';
import { Editor, ImageField, InlineSelectField, TextField } from '@/components';
import { uploadFile } from '@/components/editor/uploader';
import { ModelType } from '@/constants';
import { createFileUrl } from '@/utils';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { last } from 'ramda';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NewsStatusId } from '../../constants';

export default function WriteNews({ params }: PageProps<'scopeId' | 'postId?'>) {
  const { data: categories } = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/categories', { params: { path: params } })
  );
  const router = useRouter();
  const postIdOrDraft = last(usePathname().split('/'));
  const isDraft = postIdOrDraft === 'draft';
  const postId = !isDraft ? Number(postIdOrDraft) : (undefined as any as number);

  const postService = queryService('news:/v1/manager/{page}/posts/{postId}', {
    params: { path: { page: String(params.scopeId), postId } },
  });

  const { mutateAsync: mutateCreatePost } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts'));
  const { mutateAsync: mutateEditPost } = useMutation({
    ...mutateService('put', 'news:/v1/manager/{page}/posts/{postId}'),
    mutationKey: postService.queryKey,
  });
  const { mutateAsync: mutatePostStatus } = useMutation(
    mutateService('patch', 'news:/v1/manager/{page}/posts/{postId}/status')
  );

  const post = useQuery({
    ...postService,
    enabled: !isDraft,
  }).data;

  const [editorData, setEditorData] = useState(post?.content || '');
  const [title, setTitle] = useState(post?.title || '');
  const [status, setStatus] = useState<NewsStatusId>((post?.statusId as any as NewsStatusId) || NewsStatusId.DRAFT);
  const [isPublic, setIsPublic] = useState<boolean>(post?.isPublic || true);
  const [coverImage, setCoverImage] = useState<string | File>(post?.coverImage || '');
  const [category, setCategory] = useState<string>(post ? String(post.categoryId) : '');

  type BodyData = Parameters<typeof mutateCreatePost & typeof mutateEditPost>[0];
  function createMutateData(overrides?: Partial<BodyData['body']>): BodyData {
    return {
      params: { path: { page: String(params.scopeId), postId } },
      body: {
        title: title,
        categoryId: Number(category),
        coverImage: coverImage instanceof File ? undefined : coverImage,
        isPublic: true,
        statusId: +status,
        content: editorData,
        ...overrides,
      },
    };
  }

  function submitPost() {
    if (title && category) {
      if (isDraft) {
        return mutateCreatePost(createMutateData()).then((post) => {
          history.replaceState(null, '', './' + post.id);
        });
      } else {
        return mutateEditPost(createMutateData());
      }
    }
  }

  useEffect(() => {
    if (postId && coverImage instanceof File) {
      uploadFile(coverImage, {
        scopeId: params.scopeId,
        modelTypeId: ModelType.NEWS,
        modelId: postId,
      }).promise.then((x) => {
        setCoverImage(x.fileName!);
        mutateEditPost(createMutateData({ coverImage: x.fileName! }));
      });
    }
  }, [coverImage, postId]);

  function handleEditorChange(data: any) {
    setEditorData(data);
  }

  return (
    <form className="flex flex-col gap-2" onBlur={submitPost}>
      <h1 className="my-8 text-lg">ایجاد خبر</h1>
      <div className="flex gap-2">
        <ImageField
          className="h-[6.5rem]"
          initialPreview={!(coverImage instanceof File) && !!coverImage ? createFileUrl(coverImage, post!.fileKey) : ''}
          setSelectedImage={setCoverImage}
        />
        <div className="flex-1 flex flex-col gap-2">
          <TextField startAdornment="عنوان:" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex gap-2">
            <InlineSelectField
              label="دسته‌بندی"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              containerClassName="flex-1"
            >
              <option value="">انتخاب کنید</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </InlineSelectField>
            <InlineSelectField
              label="وضعیت"
              value={status}
              onChange={(e) => setStatus(e.target.value as NewsStatusId)}
              containerClassName="flex-1"
            >
              <option value={NewsStatusId.DRAFT}>پیش‌نویس</option>
              {/* <option value={NewsStatusId.AWAITING_CORRECTION}>در انتظار اصلاح</option> */}
              <option value={NewsStatusId.AWAITING_PUBLISHED}>در انتظار انتشار</option>
              <option disabled value={NewsStatusId.PUBLISHED}>
                منتشر شده
              </option>
              <option disabled value={NewsStatusId.UN_PUBLISH}>
                عدم انتشار
              </option>
            </InlineSelectField>
            <InlineSelectField
              label="سطح دسترسی"
              value={isPublic ? 'public' : 'private'}
              onChange={(e) => setIsPublic(e.target.value === 'public')}
              containerClassName="flex-1"
            >
              <option value="public">عمومی</option>
              <option value="private">خصوصی</option>
            </InlineSelectField>
          </div>
        </div>
      </div>
      <Editor
        uploadData={{ scopeId: params.scopeId, modelTypeId: ModelType.NEWS, modelId: postId, fileKey: post?.fileKey }}
        data={editorData}
        className="mt-2"
        onChange={(event, editor) => handleEditorChange(editor.getData())}
        disabled={isDraft}
      />
      <div className="flex gap-4">
        <button
          role="button"
          type="button"
          className="w-fit btn-primary mt-5"
          onClick={async () => {
            await submitPost();
            toast.success('تغییرات با موفقیت ذخیره شد.');
            router.push('../admin/posts');
          }}
        >
          ذخیره تغییرات
        </button>
      </div>
    </form>
  );
}
