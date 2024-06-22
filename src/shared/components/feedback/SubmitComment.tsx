import { mutateService } from '@/api';
import { ModelType } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

interface Props {
  scopeId: number;
  modelTypeId: ModelType;
  modelId: number;
}

export function SubmitComment(props: Props) {
  const { mutateAsync } = useMutation(mutateService('post', 'feedback:/v1/comments'));
  const [comment, setComment] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutateAsync({ body: { text: comment, ...props } });
  }

  return (
    <form className="p-6 rounded-lg bg-white mt-10 flex flex-col" onSubmit={handleSubmit}>
      <h5 className="font-bold text-xl">دیدگاه من:</h5>
      <textarea
        placeholder="نوشتن دیدگاه"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="rounded-lg w-full min-h-32 mt-6 bg-gray-100 resize-none p-4"
      />
      <button className="btn btn-primary w-52 text-white mt-6 left-0 self-end">ثبت دیدگاه</button>
    </form>
  );
}

/* 
<div className="p-6 rounded-lg bg-white mt-10 flex flex-col">
  <h5 className="font-bold text-xl">دیدگاه من:</h5>
  <textarea
    placeholder="نوشتن دیدگاه"
    className="rounded-lg w-full min-h-32 mt-6 bg-gray-100 resize-none p-4"
  ></textarea>
  <button className="btn btn-primary w-52 text-white mt-6 left-0 self-end">ثبت دیدگاه</button>
</div>
*/
