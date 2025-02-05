import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Check, Eye, EyeClosed, X } from "@phosphor-icons/react";

export const CInput = ({
  id,
  type = "text",
  size = "md",
  inset = false,
  state = "rest",
  validation = "none",
  direction = "rtl",
  innerLabel,
  title,
  placeholder,
  value = "",
  headingIcon,
  clearAction,
  customAction,
  customActionText,
  customAction2,
  customActionText2,
  customAction3,
  customActionText3,
  link,
  linkText,
  caption,
  successMessage,
  disabled,
  className,
  onChange,
  onBlur,
  onFocus,
  field = {},
  inputProps,
  form,
}) => {
  const [inputClasses, setInputClasses] = useState("");
  const [inputValue, setInputValue] = useState(value || "");
  const [inputSuccess, setInputSuccess] = useState(successMessage || "");
  const [inputValidation, setInputValidation] = useState(validation || "none");
  const [eyeAction, setEyeAction] = useState(false);
  const [eyeIsOpen, setEyeIsOpen] = useState(true);

  const initInput = () => {
    if (type === "password") setEyeAction(true);
  };

  const getInputClasses = useCallback(() => {
    let baseClass = "c-input";
    let classes = baseClass;

    classes += ` ${baseClass}-${size}`;
    if (inset) classes += ` ${baseClass}-inset`;
    classes += ` ${baseClass}-${state}`;
    if (form?.touched[field.name] && form?.errors[field.name])
      classes += ` ${baseClass}-error`;

    classes += ` ${baseClass}-${direction}`;

    classes += ` ${className || ""}`;

    // return 'cinput cinput-sm cinput-rest cinput-ltr';
    return classes;
  }, [className, disabled, state, validation, size, inset, direction, form]);
  const clearClicked = async () => {
    setInputValue("");
    onChange("");
  };

  const eyeClicked = async () => {
    setEyeIsOpen(!eyeIsOpen);
  };

  useEffect(() => {
    initInput();
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setInputSuccess(successMessage);
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, form, successMessage]);

  return (
    <div className={inputClasses}>
      <div className={"label-wrapper"}>
        {title && <label htmlFor={field.name}>{title}</label>}
        {link && <a href={link}>{linkText}</a>}
      </div>
      <div className={"input-wrapper"}>
        {headingIcon && (
          <span className="action-icon text-left">{headingIcon}</span>
        )}
        <input
          type={type === "password" && eyeIsOpen ? "password" : "text"}
          id={id}
          name={field.name}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e); // Propagate the change event if needed
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          value={inputValue}
          disabled={disabled}
          {...inputProps}
        />
        {clearAction && (
          <button
            type={"button"}
            onClick={clearClicked}
            className={"action-icon text-right"}
          >
            <X />
          </button>
        )}
        {eyeAction && eyeIsOpen && (
          <button
            type={"button"}
            onClick={eyeClicked}
            className={"action-icon text-right"}
          >
            <Eye />
          </button>
        )}
        {eyeAction && !eyeIsOpen && (
          <button
            type={"button"}
            onClick={eyeClicked}
            className={"action-icon text-right"}
          >
            <EyeClosed />
          </button>
        )}
        {customActionText && customAction && (
          <p
            onClick={customAction}
            className={"text-action text-right cursor-pointer"}
          >
            {customActionText}
          </p>
        )}
        {customActionText2 && customAction2 && (
          <p
            onClick={customAction2}
            className={"text-action text-right cursor-pointer"}
          >
            {customActionText2}
          </p>
        )}
        {customActionText3 && customAction3 && (
          <p
            onClick={customAction3}
            className={"text-action text-right cursor-pointer"}
          >
            {customActionText3}
          </p>
        )}
        {innerLabel && (
          <span className={"inner-label text-right"}>{innerLabel}</span>
        )}
      </div>

      <div className={"hint-wrapper"}>
        {caption && <p className={"caption"}>{caption}</p>}
        {inputSuccess && <p className={`success-message`}>{inputSuccess}</p>}
        {form?.touched[field.name] && form?.errors[field.name] && (
          <p className={`error-message`}>{form?.errors[field.name]}</p>
        )}
      </div>
    </div>
  );
};

CInput.propTypes = {
  id: PropTypes.string,
  // name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  inset: PropTypes.bool,
  state: PropTypes.oneOf(["rest", "typing", "filled", "disabled", "read-only"]),
  validation: PropTypes.oneOf(["none", "success", "error"]),
  direction: PropTypes.oneOf(["rtl", "ltr"]),
  innerLabel: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  headingIcon: PropTypes.element,
  clearAction: PropTypes.bool,
  customAction: PropTypes.func,
  customActionText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  secondCustomAction: PropTypes.func,
  secondCustomActionText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  link: PropTypes.string,
  linkText: PropTypes.string,
  caption: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object,
  form: PropTypes.object,
  inputProps: PropTypes.object,
};
