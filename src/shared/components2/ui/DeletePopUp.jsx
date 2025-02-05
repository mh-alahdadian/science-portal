import { TrashSimple } from "@phosphor-icons/react";
import { CButton } from "./CButton";

const DeletePopUp = ({
  isOpen,
  onClose,
  submitHandler,
  readOnly = false,
  disabled = false,
  title = "",
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-light-neutral-surface-backdrop bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-light-neutral-surface-card rounded-lg shadow-lg p-6 w-[560px] text-center">
        <div className="flex justify-center">
          <TrashSimple size={40} />
        </div>
        <h3 className="text-light-neutral-text-high font-headline-medium mt-9">
          {title}
        </h3>
        <p className="text-light-neutral-text-high font-body-large mt-5">
          {description}
        </p>
        <div className="flex items-center justify-around mt-12 font-button-large">
          <div className="w-[228px]">
            <CButton size="md" role="neutral" onClick={onClose}>
              انصراف
            </CButton>
          </div>
          <div className="w-[228px]">
            <CButton size="md" role="error" onClick={submitHandler}>
              حذف
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
