import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { SpinnerGap } from "@phosphor-icons/react";

export const CButton = ({
  type = "button",
  rightIcon = null,
  leftIcon = null,
  role = "primary",
  mode = "fill",
  size = "md",
  readOnly = false,
  disabled = false,
  className = "",
  onClick,
  children,
  width,
}) => {
  const [buttonClasses, setButtonClasses] = useState("");

  const getButtonClasses = useCallback(() => {
    let baseClass = "c-button";
    let btnClasses = baseClass;
    btnClasses += ` ${baseClass}-${size}`;
    btnClasses += ` ${baseClass}-${role}-${mode}`;

    btnClasses += ` ${className}`;

    return btnClasses;
  }, [className, disabled, readOnly, mode, role, size]);

  useEffect(() => {
    setButtonClasses(getButtonClasses());
  }, [disabled, readOnly, getButtonClasses]);

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || readOnly}
      style={width ? { width } : {}}
    >
      {disabled && <SpinnerGap size={26} className="animate-spin" />}
      {!disabled && (
        <>
          {leftIcon && (
            <span
              className={`font-button-medium ${!children ? "ml-1 mr-0" : "ml-0 mr-1"}`}
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              className={`font-button-medium ${!children ? "mr-1 ml-0" : "mr-0 ml-1"}`}
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

CButton.propTypes = {
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  role: PropTypes.oneOf(["primary", "neutral", "success", "error"]),
  mode: PropTypes.oneOf(["fill", "outline", "text"]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  width: PropTypes.number,
};
