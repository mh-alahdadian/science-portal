import { CaretDown, CaretUp } from "@phosphor-icons/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";

const Accordion = ({ children, Header, isOpen = false, showBox = true }) => {
  const [open, setOpen] = useState(isOpen);
  const [child, { height: child_height }] = useMeasure();
  const [header, { height: header_height }] = useMeasure();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // useEffect(() => {
  //   setOpen(false);
  // }, []);

  return (
    <div
      className={clsx(
        "transition-all duration-75 px-6",
        showBox
          ? "bg-white shadow-[0px_2px_20px_0px_#0000000D] rounded-lg"
          : "",
      )}
      style={{
        height: open ? child_height + header_height + 16 : header_height,
      }}
    >
      <div ref={header} className="hover:cursor-pointer">
        <div
          className="flex items-center justify-between w-full py-6"
          onClick={() => setOpen((l) => !l)}
        >
          <>{Header}</>
          <>{open ? <CaretUp size={18} /> : <CaretDown size={18} />}</>
        </div>
      </div>
      <div
        ref={child}
        className="pb-6"
        style={{ display: open ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
};
export default Accordion;
