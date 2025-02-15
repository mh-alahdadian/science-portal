import { ShareNetwork } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useState } from 'react';

export default function ShareButton() {
  // const [showPopover, setShowPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState<string>();
  const showPopover = !!popoverMessage;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPopoverMessage('کپی شد.');
      setTimeout(() => setPopoverMessage(undefined), 2000);
    } catch (err) {
      setPopoverMessage('مشکلی رخ داد.');
      setTimeout(() => setPopoverMessage(undefined), 2000);
    }
  };

  return (
    <div className="relative inline-block">
      <div onClick={copyToClipboard} className="cursor-pointer btn btn-sm px-4 py-2 bg-[#f5f7f8] text-xs font-semibold">
        <ShareNetwork size={18} />
        اشتراک گذاری
      </div>

      {/* Popover */}
      <div
        className={clsx(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
          showPopover ? 'opacity-100 visible' : 'opacity-0 invisible',
          'transition-opacity duration-300 ease-in-out'
        )}
      >
        <div className="bg-accent text-nowrap text-success-content rounded-box px-2 py-1 text-xs shadow-lg flex items-center">
          {popoverMessage}
        </div>
      </div>
    </div>
  );
}
