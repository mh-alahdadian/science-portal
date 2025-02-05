import { useEffect, useRef, useState } from "react";
import style from "./index.module.css";
import {
  Check,
  Question,
  Warning,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import HelpBox from "../HelpBox/index.jsx";
import { CUl } from "../ui/CUl.jsx";
const Drawer = ({ children, setShowMore, helpArray = [] }) => {
  const drawerRef = useRef(null);

  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowMore(false);
    };

    const drawerElement = drawerRef.current;
    drawerElement.addEventListener("keydown", handleKeyDown);
    drawerElement.focus();
    return () => drawerElement.removeEventListener("keydown", handleKeyDown);
  }, [setShowMore]);

  return (
    <div className="!fixed block z-[101] w-full h-full top-0 left-0 [direction:ltr]">
      <div
        className="!fixed z-10 w-screen h-screen bg-light-neutral-surface-backdrop top-0 left-0"
        onClick={() => setShowMore(false)}
      ></div>
      <div
        className={
          `px-6 pt-8 w-[565px] bg-white h-screen overflow-auto scrollbar-thin [direction:rtl] fixed top-0 left-0 z-10 border-none outline-none cursor-default` +
          ` ${style.animation}`
        }
        ref={drawerRef}
        tabIndex={0}
      >
        <div className={"flex flex-row w-full justify-between mb-4"}>
          <div className={"flex flex-auto"}>
            <X
              size={20}
              className={"cursor-pointer text-light-neutral-text-medium"}
              onClick={() => setShowMore(false)}
            />
          </div>
          {helpArray.length > 0 && (
            <div
              className={
                "flex font-button-medium text-light-primary-text-rest cursor-pointer"
              }
              onClick={() => setShowHelp(!showHelp)}
            >
              <Question size={15} className={"ml-2"} />
              <span>راهنما</span>
            </div>
          )}
        </div>
        {helpArray.length > 0 && showHelp && (
          <div className={"flex w-full"}>
            <HelpBox setShow={setShowHelp}>
              <CUl listArray={helpArray} />
            </HelpBox>
          </div>
        )}
        <div className="w-full text-justify">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
