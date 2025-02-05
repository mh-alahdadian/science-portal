import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { toPersianNumber } from "utils/helper.js";
import { Info } from "@phosphor-icons/react";

export const COtpInput = ({
  id,
  size = "md",
  inset = false,
  state = "rest",
  validation = "none",
  direction = "rtl",
  title,
  value,
  link,
  linkText,
  caption,
  infoClickHandler,
  successMessage,
  disabled,
  className,
  onChange,
  onBlur,
  onFocus,
  field,
  timerIncluded = true,
  description,
  form: { errors, touched },
}) => {
  const [inputClasses, setInputClasses] = useState("");
  const [inputValue, setInputValue] = useState(value || "");
  const [inputSuccess, setInputSuccess] = useState(successMessage || "");
  const timer = useRef(Date.now() + 360000);

  const getInputClasses = useCallback(() => {
    let baseClass = "c-otp-input";
    let classes = baseClass;

    classes += ` ${baseClass}-${size}`;
    if (inset) classes += ` ${baseClass}-inset`;
    classes += ` ${baseClass}-${state}`;
    if (touched[field.name] && errors[field.name])
      classes += ` ${baseClass}-error`;

    classes += ` ${baseClass}-${direction}`;

    classes += ` ${className || ""}`;

    return classes;
  }, [
    className,
    disabled,
    state,
    validation,
    size,
    inset,
    direction,
    errors,
    touched,
  ]);

  useEffect(() => {
    setInputSuccess(successMessage);
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, errors, touched, successMessage]);

  const timerRenderer = ({ minutes, seconds, completed }) => {
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    if (completed) {
      return (
        <a href={"/forgot-password"} className={"underline"}>
          ارسال مجدد کد
        </a>
      );
    } else {
      return (
        <span>{toPersianNumber(`${paddedMinutes}:${paddedSeconds}`)}</span>
      );
    }
  };

  return (
    <div className={inputClasses}>
      <div className={"label-wrapper"}>
        {title && <label htmlFor={field.name}>{title}</label>}
        {link && <a href={link}>{linkText}</a>}
      </div>
      <div className={"input-wrapper"}>
        <OtpInput
          id={id}
          name={field.name}
          onChange={(value) => {
            setInputValue(value);
            onChange(value); // Call the onChange prop to update the parent component
          }}
          value={inputValue}
          numInputs={6}
          renderSeparator={<span> </span>}
          renderInput={(inputProps) => <input {...inputProps} />}
          containerStyle={{
            justifyContent: "space-between",
            direction: "ltr",
            width: "100%",
            height: "100%",
          }}
          inputStyle={"input-style"}
        />
      </div>
      <div
        className={
          "text-light-neutral-text-medium text-xs flex items-center gap-1 mt-2 mb-5"
        }
      >
        {timerIncluded && (
          <>
            <Countdown
              date={timer.current}
              renderer={timerRenderer}
              className={"font-overline-large text-light-neutral-text-medium"}
            />
            <p>تا دریافت کد جدید</p>
          </>
        )}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={infoClickHandler}
        >
          <Info />
          <p className="font-overline-large">{description}</p>
        </div>
      </div>
      <div className={"hint-wrapper"}>
        {inputSuccess && <p className={`success-message`}>{inputSuccess}</p>}
        {touched[field.name] && errors[field.name] && (
          <p className={`error-message`}>{errors[field.name]}</p>
        )}
      </div>
    </div>
  );
};

COtpInput.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  inset: PropTypes.bool,
  state: PropTypes.oneOf(["rest", "typing", "filled", "disabled", "read-only"]),
  validation: PropTypes.oneOf(["none", "success", "error"]),
  direction: PropTypes.oneOf(["rtl", "ltr"]),
  title: PropTypes.string,
  value: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
  caption: PropTypes.string,
  successMessage: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
