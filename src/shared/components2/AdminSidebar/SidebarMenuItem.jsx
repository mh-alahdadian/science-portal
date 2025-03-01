import { useState } from "react";
import { useRouter } from 'next/navigation';
import { CaretDown, CaretLeft } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import ToolTip from "../ui/ToolTip";

export const SidebarMenuItem = ({
  isActive = false,
  title = "عنوان",
  icon: Icon,
  path = "#",
  onClick,
  isSidebarOpen = true,
  children,
  disabled = false,
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const router = useRouter()
  // Toggle the visibility of the submenu
  const handleClick = () => {
    if (!!children) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (!disabled) {
      router.push(path);
      onClick();
    }
  };

  return (
    <>
      {isSidebarOpen ? (
        <>
          <div
            onClick={handleClick}
            className={`flex items-center ${
              children ? "justify-between" : "justify-end"
            } px-[8px] py-[8px] relative self-stretch w-full flex-[0_0_auto]
         ${isActive ? "bg-[#E9E6F7]" : "hover:bg-light-neutral-background-low"}
         rounded-[8px] cursor-pointer`}
          >
            {!!children && isSubmenuOpen && (
              <CaretDown
                className="!relative !w-[12px] !h-[12px]"
                opacity={`${disabled ? "0.2" : isActive ? "1" : "0.5"}`}
              />
            )}
            {!!children && !isSubmenuOpen && (
              <CaretLeft
                className="!relative !w-[12px] !h-[12px]"
                opacity={`${disabled ? "0.2" : isActive ? "1" : "0.5"}`}
              />
            )}
            <div className="inline-flex items-center justify-end gap-[16px] relative flex-[0_0_auto]">
              <div
                className={
                  "relative w-fit mt-[-1.00px] font-body-medium whitespace-nowrap [direction:rtl] " +
                  `${
                    disabled
                      ? "text-light-neutral-text-disable"
                      : isActive
                      ? "text-light-neutral-text-high font-body-medium"
                      : "text-light-neutral-text-medium"
                  }`
                }
              >
                {title}
              </div>
              {Icon && (
                <Icon
                  className={`!relative !w-[18px] !h-[18px] ${
                    isActive ? "text-light-primary-background-rest" : ""
                  }`}
                  opacity={disabled ? "0.5" : "1"}
                />
              )}
            </div>
          </div>
          {!!children && (
            <div
              className={`flex flex-col items-end gap-[4px] relative self-stretch w-full transition-all duration-500 ease-in-out 
          ${isSubmenuOpen ? "max-h-96" : "max-h-0 overflow-hidden"}`}
            >
              {children}
            </div>
          )}
        </>
      ) : (
        <>
          <div
            onClick={handleClick}
            className={`flex items-center justify-end px-[8px] py-[4px] relative w-fit flex-[0_0_auto] ${
              isActive ? "bg-[#E9E6F7]" : ""
            } rounded-[8px] cursor-pointer`}
          >
            <div className="inline-flex items-center justify-end gap-[16px] relative flex-[0_0_auto]">
              {Icon && (
                <ToolTip comp={title} position="left">
                  <Icon
                    className={`!relative !w-[18px] !h-[18px] ${
                      isActive ? "text-light-primary-background-rest" : ""
                    }`}
                    opacity={disabled ? "0.5" : "1"}
                  />
                </ToolTip>
              )}
            </div>
            {!!children && (
              <div
                className={`flex flex-col items-end gap-[4px] absolute right-[45px] top-0 w-fit 
          bg-light-neutral-surface-card ${
            isSubmenuOpen ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
              >
                {children}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

SidebarMenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.object,
  active: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  title: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node,
};
