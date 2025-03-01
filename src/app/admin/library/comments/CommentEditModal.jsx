import CancelBtn from '@/admin-components/Modals/Btns/CancelBtn';
import EditDoneBtn from '@/admin-components/Modals/Btns/EditDoneBtn';
import CheckBox from '@/admin-components/Modals/Checkbox/CheckBox';
import ModalHeader from '@/admin-components/Modals/ModalHeader/ModalHeader';
import { mutateService } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function CommentEditModal({ setIsModalOpen, modalData, setEditModal, currentPage }) {
  const [isPublish, setIsPublish] = useState(modalData ? modalData.publish : false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm();
  const ref = useRef();
  const containerRef = useRef();

  useEffect(() => {
    function clickHandler() {
      if (!ref.current.contains(event.target) && event.target == containerRef.current) {
        handleClose();
      }
    }

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  function handleClose() {
    setIsModalOpen(false);
    setEditModal({});
  }

  function handlePublish() {
    setIsPublish((prev) => !prev);
    unregister('reason');
  }

  const { mutateAsync: unpublishComment } = useMutation(
    mutateService('post', 'feedback:/v1/manager/{page}/un-publish/{id}')
  );
  const { mutateAsync: publishComment } = useMutation(
    mutateService('post', 'feedback:/v1/manager/{page}/comments/publish/{id}')
  );
  async function submit(data) {
    if (data.reason) {
      await unpublishComment({ params: { path: { page: currentPage, id: modalData.id } }, body: data });
    } else {
      await publishComment({ params: { path: { page: currentPage, id: modalData.id } } });
    }
    setIsModalOpen(false);
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
            <ModalHeader title={'تنظیمات کامنت'} id={modalData.id} />

            <div className="flex gap-5 items-end">
              <div className="flex flex-col flex-1">
                <p className="opacity-70 text-sm mb-1">متن کامنت: </p>
                <p>{modalData.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="publish" className="opacity-70 text-sm">
                انتشار
              </label>
              <CheckBox isActive={isPublish} onClick={handlePublish} />
            </div>

            {!isPublish && (
              <div className="flex flex-col my-5 ">
                <label htmlFor="desc" className="opacity-70 text-sm mb-1">
                  دلیل لغو انتشار
                </label>
                <input
                  className="p-4 border rounded-md shadow-inner"
                  style={{ borderColor: 'lightgray' }}
                  type="text"
                  name="desc"
                  id="desc"
                  defaultValue={!isPublish && modalData.unPublishReason}
                  {...register('reason', {
                    required: 'فیلد را پر کنید',
                  })}
                />
                {errors.reason && <p style={{ color: 'red', fontSize: '12px' }}>{errors.reason.message}</p>}
              </div>
            )}
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

export default CommentEditModal;
