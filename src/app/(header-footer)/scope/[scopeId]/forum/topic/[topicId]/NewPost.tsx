'use client';

import { mutateService } from '@/api';
import { EntityForm } from '@/components';
import { UiSchema } from '@rjsf/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type PostDTO = Schema<'PostDTO'>;

const schema: JsonSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      title: 'متن پاسخ شما',
    },
  },
};

const uiSchema: UiSchema<Pick<PostDTO, 'content'>, JsonSchema> = {
  'ui:submitButtonOptions': {
    submitText: 'ارسال',
  },
  content: {
    'ui:widget': 'editor',
  },
};

export function NewPost({ params }: { params: Params<'scopeId' | 'topicId'> }) {
  const router = useRouter();
  const { mutate } = useMutation({
    ...mutateService('post', 'forum:/v1/scope/{scopeId}/topic/posts'),
  });

  return (
    <div>
      <EntityForm
        className="mb-32"
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={({ formData }) =>
          mutate({
            params: { path: { scopeId: params.scopeId } },
            body: { topicId: params.topicId, ...formData! },
          })
        }
      />
    </div>
  );
}
