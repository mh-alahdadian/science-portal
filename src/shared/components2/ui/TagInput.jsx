import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { X } from "@phosphor-icons/react";
import input from "pages/user/show-profile/components/Input.jsx";

export const TagInput = ({
  id,
  size = "md",
  inset = false,
  state = "rest",
  validation = "none",
  direction = "rtl",
  innerLabel,
  title,
  placeholder,
  value,
  headingIcon,
  link,
  linkText,
  caption,
  successMessage,
  disabled,
  className,
  onChange,
  onBlur,
  onFocus,
  initialTags,
  field = {},
  inputProps,
  form,
}) => {
  const [inputClasses, setInputClasses] = useState("");
  const [inputValue, setInputValue] = useState(value || "");
  const [inputSuccess, setInputSuccess] = useState(successMessage || "");
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    setSelectedList(initialTags?.filter((tag) => tag !== ""));
  }, [initialTags]);

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

  useEffect(() => {
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, form, successMessage]);

  // const onKeyDown = (e) => {
  //   if ((e.key === "Enter" || e.keyCode === 13) && inputValue.length > 1) {
  //     setSelectedList((l) =>
  //       !l.includes(inputValue.trim()) ? [...l, inputValue.trim()] : [...l],
  //     );
  //     setInputValue("");
  //     onChange(
  //       !selectedList.includes(inputValue.trim())
  //         ? [...selectedList, inputValue.trim()]
  //         : [...selectedList],
  //     );
  //   }
  // };

  const onKeyDown = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && inputValue.length > 1) {
      const newTag = inputValue.trim();
      if (!selectedList.includes(newTag)) {
        const updatedList = [...selectedList, newTag];
        setSelectedList(updatedList);
        setInputValue("");
        onChange(updatedList);
      }
    }
  };

  const onItemSelect = (index) => {
    const copy = [...selectedList];
    copy.splice(index, 1);
    setSelectedList([...copy]);
    onChange([...copy]);
  };

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
          type={"text"}
          id={id}
          name={field.name}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          value={inputValue}
          onKeyDown={onKeyDown}
          {...inputProps}
        />
        {innerLabel && (
          <span className={"inner-label font- text-right"}>{innerLabel}</span>
        )}
      </div>

      <div className={"hint-wrapper"}>
        {caption && <p className={"caption [direction:rtl]"}>{caption}</p>}
        {inputSuccess && <p className={`success-message`}>{inputSuccess}</p>}
        {form?.touched[field.name] && form?.errors[field.name] && (
          <p className={`error-message`}>{form?.errors[field.name]}</p>
        )}
      </div>
      <div className={"text-right"}>
        {selectedList?.map((keyword, index) => (
          <div
            key={keyword}
            className={
              "inline-flex flex-row items-center bg-light-neutral-background-low ml-2 my-1 border border-light-neutral-border-low-rest h-[30px] py-[6px] px-2 rounded-[8px] [direction:rtl]"
            }
          >
            <span className={"flex flex-1 pl-2 text-body-small"}>
              {keyword}
            </span>
            <X
              size={13}
              className={"cursor-pointer text-light-neutral-text-low "}
              onClick={() => {
                onItemSelect(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

TagInput.propTypes = {
  id: PropTypes.string,
  // name: PropTypes.string.isRequired,
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
  initialTags: PropTypes.array,
  link: PropTypes.string,
  linkText: PropTypes.string,
  caption: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object,
  form: PropTypes.object,
  inputProps: PropTypes.object,
};
