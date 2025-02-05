import { CaretDoubleLeft, SlidersHorizontal } from "@phosphor-icons/react";
import { Card } from "../../ui/Card.jsx";
import PropTypes from "prop-types";
import useSearchStore from "store/searchStore.js";

export const FilterSetting = ({ className = "" }) => {
  const { isFilterListOpen, toggleOpenClose, getActiveFilters } =
    useSearchStore();

  return (
    <Card
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      className={`flex flex-row justify-between !p-[16px] !relative ${
        !isFilterListOpen && "cursor-pointer"
      } ${className}`}
    >
      {getActiveFilters().length > 1 && (
        <div
          className={
            "absolute top-1 right-1 bg-light-warning-background-rest w-2 h-2 rounded-full"
          }
        ></div>
      )}
      <div
        className={`flex w-full ${
          isFilterListOpen ? "justify-between" : "justify-center"
        } font-body-medium `}
      >
        {isFilterListOpen && (
          <div
            onClick={toggleOpenClose}
            className={
              "font-overline-medium text-light-neutral-text-medium items-center cursor-pointer"
            }
          >
            <CaretDoubleLeft className={"inline"} />
            <span> نمایش کمتر</span>
          </div>
        )}
        <div className={"flex"}>
          {isFilterListOpen && (
            <span
              className={"inline-flex font-subtitle-medium text-black mr-1"}
            >
              تنظیمات جست‌وجو / فیلتر
            </span>
          )}
          <span
            className={
              "inline-flex justify-center items-center px-1 bg-light-inform-background-rest rounded-[8px] w-[24px] h-[24px]"
            }
          >
            <SlidersHorizontal
              size={16}
              className={"inline text-light-neutral-surface-card"}
            />
          </span>
        </div>
      </div>
    </Card>
  );
};

FilterSetting.propTypes = {
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
