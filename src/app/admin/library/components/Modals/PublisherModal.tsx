import { mutateService } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddDoneBtn from './Btns/AddDoneBtn';
import CancelBtn from './Btns/CancelBtn';
import EditDoneBtn from './Btns/EditDoneBtn';
import EnableCheckbox from './EnableCheckbox/EnableCheckbox';
import FileInput from './FileInput';
import ModalHeader from './ModalHeader/ModalHeader';

function PublisherModal({ setIsModalOpen, modalData, setEditModal }: any) {
  const [image, setImage] = useState(modalData.id ? modalData.original.coverImage : '');
  const [enable, setEnable] = useState(modalData.id ? modalData.original.enable : false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const ref = useRef<any>(null);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    function clickHandler(event: MouseEvent) {
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

  setValue('enable', enable);
  setValue('coverImage', image);
  if (modalData.id) {
    register('id');
    setValue('id', modalData.original.id);
  }

  const { mutateAsync: updatePublisher } = useMutation(
    mutateService('put', 'library:/v1/manager/{page}/publishers/{publisherId}')
  );
  async function putData(data: any) {
    await updatePublisher({ params: { path: { page: String(0), publisherId: data.id } }, body: data });
    setIsModalOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  const { mutateAsync: createPublisher } = useMutation(mutateService('post', 'library:/v1/manager/{page}/publishers'));
  async function postData(data: any) {
    await createPublisher({ params: { path: { page: String(0) } }, body: data });
    setIsModalOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
  return (
    <>
      <div
        className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50"
        style={{ backgroundColor: 'rgba(0 ,0 ,0 , 0.1)', backdropFilter: 'blur(3px)' }}
        ref={containerRef}
      >
        <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
          <ModalHeader
            title={modalData.id ? 'ویرایش ناشر' : 'افزودن ناشر'}
            id={modalData.id ? modalData.original.id : ''}
          />

          <form className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: '450px' }}>
            <FileInput setImage={setImage} image={image} modalData={modalData} {...register('coverImage')} />

            <div className="flex flex-col flex-1">
              <label htmlFor="name" className="opacity-70 text-sm mb-1">
                نام ناشر
              </label>
              <input
                className="p-2 border rounded-md shadow-inner"
                style={{ borderColor: 'lightgray' }}
                type="text"
                id="name"
                defaultValue={modalData.id && modalData.original.name}
                {...register('name', {
                  required: 'فیلد را پر کنید',
                })}
              />
              {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message as string}</p>}
            </div>

            <div className="flex items-center gap-2">
              <EnableCheckbox enable={enable} setEnable={setEnable} {...register('enable')} />
              <label htmlFor="enable" className="opacity-70 text-sm">
                فعال
              </label>
            </div>
          </form>

          <div className="flex justify-between gap-5">
            {modalData.id ? (
              <EditDoneBtn onClick={handleSubmit(putData)} />
            ) : (
              <AddDoneBtn onClick={handleSubmit(postData)} />
            )}
            <CancelBtn handleClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PublisherModal;
