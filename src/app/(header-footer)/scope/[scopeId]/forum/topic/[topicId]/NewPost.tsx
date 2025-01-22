'use client';

import { mutateService, queryService } from '@/api';
import { EntityForm } from '@/components';
import { UiSchema } from '@rjsf/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type PostDTO = Schema<'PostDTO'>;

interface Props {
  params: Params<'scopeId' | 'topicId'>;
  topic: Schema<'TopicResponseDTO'>;
}

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

export function NewPost({ params, topic }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...mutateService('post', 'forum:/v1/scope/{scopeId}/topic/messages'),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queryService('forum:/v1/scope/{scopeId}/topic/{topicId}/messages', {} as any).queryKey,
      });
    },
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
