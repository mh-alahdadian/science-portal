import { mutateService, queryService } from '@/api';
import { ModelType } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  scopeId: number;
  modelTypeId: ModelType;
  modelId: number;
}

export function SubmitComment(props: Props) {
  const { mutateAsync } = useMutation(mutateService('post', 'feedback:/v1/comments'));
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutateAsync({ body: { text: comment, ...props } })
      .then(() => {
        setComment('');
        toast.success('دیدگاه شما با موفقیت ثبت شد.');
        queryClient.invalidateQueries(
          queryService('feedback:/v1/comments', {
            params: { query: { dto: { modelId: props.modelId, modelTypeId: props.modelTypeId } } },
          })
        );
      })
      .catch(() => {
        toast.error('دیدگاه شما ثبت نشد.');
      });
  }

  return (
    <form className="p-6 rounded-lg bg-white flex flex-col" onSubmit={handleSubmit}>
      {/* <h5 className="font-bold text-xl">دیدگاه من:</h5> */}
      <p>لطفا قبل از ارسال دیدگاه خود حتما "قوانین و مقررات" را مطالعه فرمایید.</p>
      <textarea
        placeholder="نوشتن دیدگاه"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="rounded-md outline-none w-full min-h-32 mt-6 resize-none p-4 border-[#e0e0e0] border-solid border-1 pl-20"
      />
      <button
        style={{ transform: 'translate(0, -100%)' }}
        className="bg-varz rounded-md btn-sm text-white -mt-2 ml-2 -translate-y-full self-end"
      >
        ارسال
      </button>
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
  <button className="btn-primary w-52 text-white mt-6 left-0 self-end">ثبت دیدگاه</button>
</div>
*/
