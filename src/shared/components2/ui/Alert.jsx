import {
  Info,
  SealCheck,
  Warning,
  WarningOctagon,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import React, { useState } from "react";

const Alert = ({
  type = "info",
  title = "",
  children,
  showCloseButton = true,
}) => {
  const [show, setShow] = useState(true);

  const selectBgColor = (type) => {
    switch (type) {
      case "info":
        return "bg-light-inform-background-highlight";
      case "error":
        return "bg-light-error-background-highlight";
      case "warning":
        return "bg-light-warning-background-highlight";
      case "success":
        return "bg-light-success-background-highlight";
      case "neutral":
        return "bg-light-neutral-surface-highlight";
      default:
        return "bg-light-primary-background-highlight";
    }
  };

  const selectIcon = {
    info: <Info color="#0A55E1" size={24} />,
    error: <WarningOctagon color="#BE223C" size={24} />,
    warning: <Warning color="#DB9100" size={24} />,
    success: <SealCheck color="#1CB0A5" size={24} />,
    neutral: <Info color="#00000080" size={24} />,
    primary: <img className={"h-[24px]"} src="/logo.svg" alt="Stinas Logo" />,
  };

  if (!show) return null;

  return (
    <div
      className={clsx(
        "p-4 rounded-lg flex justify-between",
        selectBgColor(type),
      )}
    >
      <div
        className={clsx("flex", title ? "flex-col gap-4" : "flex-row gap-2")}
      >
        <div className={clsx("flex gap-2", title ? "items-center" : "")}>
          <div>{selectIcon[type]}</div>
          {title && <div className="font-body-large">{title}</div>}
        </div>
        <div className="font-body-medium">{children}</div>
      </div>
      {showCloseButton && (
        <div onClick={() => setShow(false)} className="cursor-pointer">
          <X size={16} />
        </div>
      )}
    </div>
  );
};

export default Alert;
