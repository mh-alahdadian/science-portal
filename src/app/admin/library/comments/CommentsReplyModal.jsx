import CancelBtn from '@/admin-components/Modals/Btns/CancelBtn';
import EditDoneBtn from '@/admin-components/Modals/Btns/EditDoneBtn';
import ModalHeader from '@/admin-components/Modals/ModalHeader/ModalHeader';
import { mutateService } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

function CommentsReplyModal({ setIsReplyOpen, modalData, setEditModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ref = useRef();
  const containerRef = useRef();

  useEffect(() => {
    function clickHandler() {
      if (!ref.current.contains(event.target) && event.target == containerRef.current) {
        setIsReplyOpen(false);
      }
    }

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  function handleClose() {
    setIsReplyOpen(false);
    setEditModal({});
  }

  const { mutateAsync: replyComment } = useMutation(mutateService('post', 'feedback:/v1/comments/{commentId}/reply'));
  async function submit(data) {
    await replyComment({ params: { path: { commentId: modalData.id } }, body: data });
    setIsReplyOpen(false);
  }

  return (
    <>
      <div
        className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50"
        style={{ backgroundColor: 'rgba(0 ,0 ,0 , 0.1)', backdropFilter: 'blur(3px)' }}
        ref={containerRef}
      >
        <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
          <form className="flex flex-col gap-6" style={{ minWidth: '450px' }}>
            <ModalHeader title={'پاسخ به کامنت'} id={modalData.id} />
            <div className="flex flex-col">
              <label htmlFor="reply" className="opacity-70 text-sm mb-1">
                جواب
              </label>
              <textarea
                className="p-4 border rounded-md shadow-inner"
                style={{ borderColor: 'lightgray' }}
                type="text"
                name="reply"
                id="reply"
                {...register('text', {
                  required: 'فیلد را پر کنید',
                })}
              />
              {errors.text && <p style={{ color: 'red', fontSize: '12px' }}>{errors.text.message}</p>}
            </div>
          </form>

          <div className="flex justify-between gap-5 mt-5">
            <EditDoneBtn onClick={handleSubmit(submit)} />
            <CancelBtn handleClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CommentsReplyModal;
