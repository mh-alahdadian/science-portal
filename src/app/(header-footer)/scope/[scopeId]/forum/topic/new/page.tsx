'use client';
import { use } from 'react';

import { mutateService, queryService } from '@/api';
import { EntityForm } from '@/components';
import { UiSchema } from '@rjsf/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Topic = Schema<'TopicRequestDTO'>;

const schema: JsonSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'موضوع',
    },
    category: {
      type: 'string',
      title: 'دسته بندی',
    },
    content: {
      type: 'string',
      title: 'متن سوال',
    },
    tags: {
      type: 'array',
      title: 'تگ‌ها',
      uniqueItems: true,
      items: { type: 'string' },
    },
  },
};

const uiSchema: UiSchema<Pick<Topic, 'title' | 'content' | 'tags'>, JsonSchema> = {
  'ui:submitButtonOptions': {
    submitText: 'ایجاد',
  },
  content: {
    'ui:widget': 'editor',
  },
  category: {
    'ui:widget': 'autocomplete',
    'ui:options': {
      useOptions: (search: string) =>
        useQuery({
          ...queryService('forum:/v1/scope/{scopeId}/categories', {
            params: { path: { scopeId: 1 /* +window?.location.pathname.split('/')[1] */ } },
          }),
          select: (data) => data.map(({ id, title }) => ({ id: id?.toString(), name: title })),
        }),
    },
  },
  tags: {
    'ui:widget': 'autocomplete',
    'ui:options': {
      useOptions: (search: string) =>
        useQuery({
          ...queryService('forum:/v1/tags', { params: { query: { q: search } as any } }),
          placeholderData: [],
          queryFn: () => {
            return [
              { id: 1, name: 'item 1' },
              { id: 2, name: 'item 2' },
              { id: 3, name: 'item 3' },
            ];
          },
        }),
    },
  },
};

export default function NewTopicPage(props: PageProps<'scopeId'>) {
  const searchParams = use(props.searchParams);
  const params = use(props.params);

  const router = useRouter();
  const { mutate } = useMutation({
    ...mutateService('post', 'forum:/v1/scope/{scopeId}/topics'),
    onSuccess(data, variables, context) {
      // TODO: use topic.id later
      router.push('1');
    },
  });

  return (
    <div>
      <EntityForm
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={({ formData }) =>
          mutate({
            params: { path: params },
            body: { categoryId: +searchParams.categoryId, enable: true, ...formData! },
          })
        }
      />
    </div>
  );
}
