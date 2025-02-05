import clsx from "clsx";
import PropTypes from "prop-types";

const ToolTip = ({
  children,
  comp,
  position = "top",
  mode = "hover",
  hasNoWrap = true,
  className = "",
  childrenStyle = "",
}) => {
  const handlePosition = (position) => {
    switch (position) {
      case "top":
        return "left-1/2 bottom-8 -translate-x-1/2";
      case "top-end":
        return "right-1/2 bottom-8 translate-x-1/4";
      case "top-start":
        return "left-1/2 bottom-8 -translate-x-1/4";
      case "bottom":
        return "left-1/2 top-8 -translate-x-1/2";
      case "bottom-end":
        return "right-1/2 top-8 translate-x-1/4";
      case "bottom-start":
        return "left-1/2 top-8 -translate-x-1/4";
      case "left":
        return "right-8 top-1/2 -translate-y-1/2";
      case "right":
        return "left-8 top-1/2 -translate-y-1/2";

      default:
        return "left-1/2 bottom-8 -translate-x-1/2";
    }
  };
  const handleSqPosition = (position) => {
    switch (position) {
      case "top":
        return "-bottom-[5px] left-1/2 -translate-x-1/2 border-b-[0.5px] border-r-[0.5px]";
      case "top-end":
        return "-bottom-[5px] right-1/4 translate-x-1/2 border-b-[0.5px] border-r-[0.5px]";
      case "top-start":
        return "-bottom-[5px] left-1/4 -translate-x-1/2 border-b-[0.5px] border-r-[0.5px]";
      case "bottom":
        return "-top-[5px] left-1/2 -translate-x-1/2 border-t-[0.5px] border-l-[0.5px]";
      case "bottom-end":
        return "-top-[5px] right-1/4 translate-x-1/2 border-t-[0.5px] border-l-[0.5px]";
      case "bottom-start":
        return "-top-[5px] left-1/4 -translate-x-1/2 border-t-[0.5px] border-l-[0.5px]";
      case "left":
        return "-right-[5px] top-1/2 -translate-y-1/2 border-t-[0.5px] border-r-[0.5px]";
      case "right":
        return "-left-[5px] top-1/2 -translate-y-1/2 border-b-[0.5px] border-l-[0.5px]";

      default:
        return "-bottom-[5px] left-1/2 -translate-x-1/2 border-b-[0.5px] border-r-[0.5px]";
    }
  };
  if (mode === "click") {
    return (
      <div className={`relative group font-body-small ${className}`}>
        <div
          className={clsx(
            "z-[100] whitespace-nowrap group-hover:block hidden absolute rounded-lg border-[0.5px] border-light-neutral-border-low-rest p-3 bg-white shadow-[0px_3px_20px_0px_#0000001A]",
            handlePosition(position),
          )}
        >
          <div>{comp}</div>
          <div
            className={clsx(
              "size-[10px] bg-white shadow-[0px_3px_20px_0px_#0000001A] rotate-45 absolute border-light-neutral-border-low-rest",
              handleSqPosition(position),
            )}
          ></div>
        </div>

        <div className={childrenStyle}>{children}</div>
      </div>
    );
  }
  return (
    <div className={`relative group font-body-small ${className}`}>
      <div
        className={clsx(
          `z-[100] ${
            hasNoWrap ? "whitespace-nowrap" : ""
          } group-hover:block hidden absolute rounded-lg border-[0.5px] border-light-neutral-border-low-rest p-3 bg-white shadow-[0px_3px_20px_0px_#0000001A]`,
          handlePosition(position),
        )}
      >
        <div>{comp}</div>
        <div
          className={clsx(
            "size-[10px] bg-white shadow-[0px_3px_20px_0px_#0000001A] rotate-45 absolute border-light-neutral-border-low-rest",
            handleSqPosition(position),
          )}
        ></div>
      </div>

      <div className={childrenStyle}>{children}</div>
    </div>
  );
};

ToolTip.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string,
  position: PropTypes.string,
  comp: PropTypes.any,
  hasNoWrap: PropTypes.bool,
  className: PropTypes.string,
  childrenStyle: PropTypes.string,
};

export default ToolTip;
