import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Calendar,
  CaretLeft,
  CaretRight,
  Check,
  Eye,
  EyeClosed,
  Plus,
  X,
} from "@phosphor-icons/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TagButton } from "./TagButton.jsx";

export const DateInput = ({
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
  successMessage,
  disabled,
  className,
  onChange,
  field,
  inputProps,
  form: { errors, touched },
}) => {
  const [inputClasses, setInputClasses] = useState("");
  const [fromValue, setFromValue] = useState(new Date(value?.from));
  const [toValue, setToValue] = useState(new Date(value?.to));
  const [values, setValues] = useState([fromValue, toValue]);
  const [selectedOption, setSelectedOption] = useState(value.index);

  const getInputClasses = useCallback(() => {
    let baseClass = "c-input";
    let classes = baseClass;

    classes += ` ${baseClass}-${size}`;
    if (inset) classes += ` ${baseClass}-inset`;
    classes += ` ${baseClass}-${state}`;
    if (touched[field.name] && errors[field.name])
      classes += ` ${baseClass}-error`;

    classes += ` ${baseClass}-${direction}`;

    classes += ` ${className || ""}`;

    // return 'cinput cinput-sm cinput-rest cinput-ltr';
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
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, errors, touched, successMessage]);

  const getDateBefore = (daysOrMonths) => {
    const currentDate = new Date();

    if (daysOrMonths === 0) {
      // Start time of today
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
    } else {
      const newDate = new Date(currentDate);

      if (daysOrMonths > 0) {
        newDate.setDate(newDate.getDate() - daysOrMonths);
      } else {
        newDate.setMonth(newDate.getMonth() - Math.abs(daysOrMonths));
      }

      return newDate;
    }
  };

  useEffect(() => {
    if (selectedOption === -1) return;

    const fromDate = getDateBefore(selectedOption);
    setFromValue(fromDate);
    setToValue(new Date());
    setValues([fromDate, new Date()]);
    onChange({
      from: fromDate,
      to: new Date(),
      index: selectedOption,
    });
  }, [selectedOption]);

  const optionIsActive = (index) => {
    return selectedOption === index;
  };

  const handleDateChange = (e) => {
    if (e.length < 2) return;
    setFromValue(new Date(e[0]));
    setToValue(new Date(e[1]));
    setSelectedOption(-1);
    onChange({
      from: new Date(e[0]),
      to: new Date(e[1]),
      index: -1,
    });
  };

  return (
    <div className={inputClasses}>
      <div className={"label-wrapper"}>
        {title && <label htmlFor={field.name}>{title}</label>}
        {link && <a href={link}>{linkText}</a>}
      </div>
      <div className={"input-wrapper"}>
        <DatePicker
          value={values}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          range
          containerClassName={"datepicker-container"}
          onChange={handleDateChange}
          renderButton={(direction, handleClick) => (
            <button onClick={handleClick}>
              {direction === "right" ? (
                <CaretLeft size={20} />
              ) : (
                <CaretRight size={20} />
              )}
            </button>
          )}
        />
        <span className="action-icon text-left">
          <Calendar />
        </span>
      </div>
      <div className={"text-right"}>
        <div className={"flex flex-row justify-between gap-2 my-4"}>
          <TagButton
            isActive={optionIsActive(3)}
            title={"۳ روز گذشته"}
            onClick={() => {
              setSelectedOption(3);
            }}
            className={"flex-1"}
          />
          <TagButton
            isActive={optionIsActive(1)}
            title={"۲۴ ساعت گذشته"}
            onClick={() => {
              setSelectedOption(1);
            }}
            className={"flex-1"}
          />
          <TagButton
            isActive={optionIsActive(0)}
            title={"امروز"}
            onClick={() => {
              setSelectedOption(0);
            }}
            className={"flex-1"}
          />
        </div>
        <div className={"flex flex-row justify-between gap-2 my-4"}>
          <TagButton
            isActive={optionIsActive(30)}
            title={"ماه گذشته"}
            onClick={() => {
              setSelectedOption(30);
            }}
            className={"flex-1"}
          />
          <TagButton
            isActive={optionIsActive(10)}
            title={"۱۰ روز گذشته"}
            onClick={() => {
              setSelectedOption(10);
            }}
            className={"flex-1"}
          />
          <TagButton
            isActive={optionIsActive(7)}
            title={"هفته گذشته"}
            onClick={() => {
              setSelectedOption(7);
            }}
            className={"flex-1"}
          />
        </div>
      </div>
    </div>
  );
};

DateInput.propTypes = {
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
  value: PropTypes.object,
  headingIcon: PropTypes.element,
  clearAction: PropTypes.bool,
  customAction: PropTypes.bool,
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
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
};
