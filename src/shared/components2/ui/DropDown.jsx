import { CaretDown, Check } from "@phosphor-icons/react";
import { useState } from "react";
import PropTypes from "prop-types";

const DropDown = ({ title, subsets, selected, setSelected, onOpenChange }) => {
  const [open, setOpen] = useState(false);

  const handleBlur = () => {
    setOpen(false);
    onOpenChange?.(false); 
  };

  const toggleDropdown = () => {
    const newState = !open;
    setOpen(newState);
    onOpenChange?.(newState); 
  };

  return (
    <button onBlur={handleBlur} className="relative w-full" type="button">
      <div
        className="flex justify-between gap-2 items-center p-3 rounded-lg bg-light-neutral-background-medium border border-[#E1E8EF80] w-full"
        style={{
          border: !title && "1px solid #9198AD",
          backgroundColor: !title && "white",
        }}
        onClick={toggleDropdown}
      >
        {title && (
          <span className="font-overline-medium text-light-neutral-text-medium">
            {title}
          </span>
        )}
        <div
          className="flex gap-2 items-center"
          style={{
            ...(!title
              ? { justifyContent: "space-between", width: "100%" }
              : {}),
          }}
        >
          <span className="font-body-medium">{selected}</span>
          <CaretDown
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.5s",
            }}
          />
        </div>
      </div>
      {open && (
        <div
          className="absolute top-12 left-0 bg-white rounded-lg shadow-[0px_4px_20px_0px_#0000001A] p-4 z-50"
          style={{
            ...(!title ? { width: "100%" } : {}),
          }}
        >
          <div className="font-body-small flex flex-col gap-1">
            {subsets?.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-light-neutral-surface-highlight"
                style={{
                  ...(!title ? { justifyContent: "space-between" } : {}),
                }}
                onClick={() => {
                  setOpen(false);
                  onOpenChange?.(false); 
                  setSelected(item);
                }}
              >
                <span>{item}</span>
                {selected === item && <Check />}
              </div>
            ))}
          </div>
        </div>
      )}
    </button>
  );
};

DropDown.propTypes = {
  title: PropTypes.string,
  subsets: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  onOpenChange: PropTypes.func, 
};

export default DropDown;
