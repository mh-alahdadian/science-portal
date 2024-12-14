'use client';
import { use } from 'react';

import { mutateService, queryService } from '@/api';
import { Breadcrumb, Editor, FieldWrapper, InlineSelectField, TextField } from '@/components';
import { ModelType } from '@/constants';
import { getScopeUrl } from '@/utils';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { last, pick } from 'ramda';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

type Topic = Schema<'TopicRequestDTO'>;

export default function NewTopicPage(props: PageProps<'scopeId', 'topicId?'>) {
  const searchParams = use(props.searchParams);
  const params = use(props.params);

  const topicIdOrDraft = last(usePathname().split('/'));
  const isDraft = topicIdOrDraft === 'new';
  const topicId = !isDraft ? Number(topicIdOrDraft) : (undefined as any as number);

  const { data: categories } = useSuspenseQuery({
    ...queryService('forum:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
  });
  const { data: tags } = useSuspenseQuery({
    ...queryService('forum:/v1/tags', { params: {} }),
    select: (data) => data.map(({ id, name }) => ({ value: id?.toString(), label: name })),
  });

  const topicService = queryService('forum:/v1/scope/{scopeId}/topics/{topicId}', {
    params: { path: { scopeId: params.scopeId, topicId } },
  });
  const topic = useQuery({
    ...topicService,
    enabled: !isDraft,
  }).data;

  const router = useRouter();
  const x = mutateService('post', 'forum:/v1/scope/{scopeId}/topics');
  const { mutate: mutateCreateTopic } = useMutation(x);
  const { mutate: mutateEditTopic } = useMutation(
    mutateService('put', 'forum:/v1/scope/{scopeId}/topics/{topicId}' as any) as typeof x
  );

  const { control, handleSubmit, register } = useForm<Partial<Topic>>({
    defaultValues: {
      ...(topic ? pick(['categoryId', 'content', 'title', 'public'], topic) : {}),
      tags: topic?.tags?.map((tag) => tag.id!) || [],
    },
  });

  return (
    <div>
      <Breadcrumb
        params={params}
        items={[{ text: 'انجمن', url: `${getScopeUrl(params.scopeId)}/forum` }, { text: 'تاپیک جدید' }]}
      />
      <div className="flex flex-col gap-4">
        <TextField {...register('title')} label="عنوان" />
        <div className="flex">
          <InlineSelectField containerClassName="w-3/5" {...register('categoryId')} label="دسته بندی">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </InlineSelectField>
          <Controller
            name="public"
            control={control}
            render={({ field }) => (
              <InlineSelectField
                label="سطح دسترسی"
                value={field.value ? 'public' : 'private'}
                onChange={(e) => field.onChange(e.target.value === 'public')}
                containerClassName="flex-1 w-2/5 ms-4"
              >
                <option value="public">عمومی</option>
                <option value="private">خصوصی</option>
              </InlineSelectField>
            )}
          />
        </div>
        <div>
          <span className="label label-text pt-0">متن سوال</span>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                uploadData={{
                  scopeId: params.scopeId,
                  modelTypeId: ModelType.TOPIC,
                  modelId: undefined,
                  fileKey: topic?.fileKey,
                }}
                data={field.value}
                className="mt-2"
                onChange={(event, editor) => field.onChange(editor.getData())}
                // disabled={isDraft}
              />
            )}
          />
        </div>
        <FieldWrapper label="تگ‌ها">
          {/* @ts-ignore */}
          <Select
            {...register('tags')}
            isMulti
            isClearable
            isSearchable
            placeholder="تگ‌ها"
            // isLoading={loadingTags}
            options={tags}
            styles={{
              multiValue: (baseStyles) => ({
                ...baseStyles,
                alignItems: 'center',
              }),

              container: (baseStyles) => ({
                ...baseStyles,
                minWidth: 300,
              }),
            }}
          />
        </FieldWrapper>
      </div>
      <div className="card-actions">
        <button
          className="btn-primary mr-auto my-8"
          onClick={handleSubmit((formData) => {
            const body = formData! as Required<typeof formData>;
            const mutate = isDraft ? mutateCreateTopic : mutateEditTopic;
            return mutate(
              { body, params: { path: { scopeId: params.scopeId, topicId: topicId } } },
              {
                onSuccess(data, variables, context) {
                  router.push(String(data.id));
                },
              }
            );
          })}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
