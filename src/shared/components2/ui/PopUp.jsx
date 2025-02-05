import { CheckCircle, Copy, WhatsappLogo, X } from "@phosphor-icons/react";
import { CButton } from "./CButton";
import { InstagramLogo, TelegramLogo, XLogo } from "@phosphor-icons/react";
import { notification } from "../../utils/helper";
import { error } from "highcharts";

const Popup = ({
  isOpen,
  onClose = () => {},
  submitHandler = () => {},
  readOnly = false,
  disabled = false,
  title,
  isSharePopup = false,
  width = "605px",
  urlToShare,
  hasButton = true,
  hasCloseIcon = true,
  cancleButton = false,
  agreeButton = false,
  shareShortenedLink = "sy.nps/m4LW1",
  children,
}) => {
  if (!isOpen) return null;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    urlToShare
  )}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    urlToShare
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    urlToShare
  )}`;
  // const baleShareUrl = `https://ble.ir/share/url=${encodeURIComponent(
  //   urlToShare
  // )}`;
  // const eetaShareUrl = `https://eitaa.com/share/url?url=${encodeURIComponent(
  //   urlToShare
  // )}`;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center !z-[9999]">
      <div
        className="bg-light-neutral-surface-card rounded-lg shadow-lg p-6"
        style={{
          width,
        }}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-bold text-[16px] leading-7 font-body-large">
            {title}
          </h3>
          {hasCloseIcon && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X
                size={16}
                className={"cursor-pointer text-light-neutral-text-high "}
              />
            </button>
          )}
        </div>
        {children}
        {isSharePopup ? (
          <>
            <div className="flex flex-row-reverse items-center justify-center gap-4 mt-5">
              <div className="flex items-center justify-center bg-light-neutral-background-medium w-12 h-12 rounded-lg cursor-pointer">
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramLogo size={20} color="#0084C7" />
                </a>
              </div>
              <div className="flex items-center justify-center bg-light-neutral-background-medium w-12 h-12 rounded-lg cursor-pointer">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={20} color="#1CC045" />
                </a>
              </div>
              <div className="flex items-center justify-center bg-light-neutral-background-medium w-12 h-12 rounded-lg cursor-pointer">
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XLogo size={20} />
                </a>
              </div>
              {/* <div className="flex items-center justify-center bg-light-neutral-background-medium w-12 h-12 rounded-lg cursor-pointer">
                <a
                  href={eetaShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={eeta} alt="eeta" />
                </a>
              </div>
              <div className="flex items-center justify-center bg-light-neutral-background-medium w-12 h-12 rounded-lg cursor-pointer">
                <a
                  href={baleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Bale} alt="Bale" />
                </a>
              </div> */}
            </div>

            <div className="flex flex-row-reverse items-center justify-between">
              <input
                value={shareShortenedLink}
                readOnly
                className="mt-3 bg-light-neutral-background-low p-3 outline-light-neutral-border-low-rest border border-light-neutral-border-low-rest w-[196px] h-12 rounded-md font-body-large text-light-neutral-text-medium"
                type="text"
                dir="ltr"
              />
              <div className="flex items-center mt-3 w-1/3">
                <CButton
                  leftIcon={<Copy />}
                  className="font-button-large"
                  size="lg"
                  role="neutral"
                  onClick={() => {
                    const textarea = document.createElement("textarea");
                    textarea.value = urlToShare;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    onClose();
                    notification.success(
                      `کپی شد`,
                      <CheckCircle className="text-light-success-text-rest" />
                    );
                  }}
                >
                  کپی
                </CButton>
              </div>
            </div>
          </>
        ) : (
          hasButton && (
            <div className="flex items-center justify-between gap-4 mt-4 font-button-large">
              <div className="w-full">
                <CButton
                  className="bg-light-neutral-background-medium rounded-lg p-3 w-[100px]"
                  role="neutral"
                  onClick={onClose}
                >
                  {cancleButton || "انصراف"}
                </CButton>
              </div>
              <div className="w-full" onClick={submitHandler}>
                <CButton disabled={disabled} readOnly={readOnly}>
                  {agreeButton || "ثبت"}
                </CButton>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Popup;
