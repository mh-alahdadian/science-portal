import {Check, WarningCircle} from "@phosphor-icons/react";
const HelpBox = ({
   icon=<WarningCircle size={26}/>,
   title,
   bgColor = 'bg-light-neutral-surface-highlight',
   setShow,
   children
 }) => {
  return (
    <>
      <div className={`mb-4 p-4 flex flex-col gap-8 w-full rounded-lg ${bgColor}`}>
        {title && (
          <div className="inline-flex items-center">
            <span className="text-light-neutral-text-high font-body-large">{title}</span>
            <span className="text-light-error-text-rest mx-2">{icon}</span>
          </div>
        )}
        <div className="inline-flex">
          <p className="font-body-medium text-light-neutral-text-high">{children}</p>
        </div>
        <div className={'flex font-button-medium text-light-primary-text-rest justify-end cursor-pointer'}
             onClick={() => setShow(false)}>
          <Check size={15} className={'ml-2'}/>
          <span>متوجه شدم</span>
        </div>
      </div>
    </>
  );
};

export default HelpBox;