import {
  GenderFemale,
  GenderIntersex,
  GenderMale,
  GenderNeuter,
  IntersectThree,
} from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import useSearchStore from "store/searchStore.js";

const GenderButton = ({
  id,
  title,
  icon: Icon,
  isActive,
  onClick,
  className,
}) => {
  return (
    <div
      key={id}
      onClick={() => {
        onClick(id);
      }}
      className={
        `flex justify-center flex-col ${
          isActive
            ? "bg-light-neutral-surface-highlight text-light-primary-text-rest"
            : "bg-transparent text-light-neutral-text-low"
        } cursor-pointer h-[74px] py-[8px] px-4 rounded-[8px] [direction:rtl] ` +
        className
      }
    >
      <Icon className={"flex-1 justify-center m-auto"} size={40} />
      <span className={"flex justify-center text-body-small"}>{title}</span>
    </div>
  );
};
export const FilterGender = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const genderOptions = [
    { icon: GenderNeuter, id: "unknown", title: "نامشخص" },
    { icon: GenderFemale, id: "female", title: "زن" },
    { icon: GenderMale, id: "male", title: "مرد" },
    { icon: IntersectThree, id: "all", title: "همه" },
  ];

  const handleChange = (selectedItem) => {
    if (selectedItem === "all") {
      setFilters({ gender: ["all"] });
    } else {
      setFilters({ gender: [selectedItem] });
    }
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={GenderIntersex}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("gender")}
      title={"جنسیت کاربران"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div
          className={
            isFilterListOpen ? "flex flex-row justify-between gap-4" : "hidden"
          }
        >
          {genderOptions.map((gender) => (
            <GenderButton
              key={gender.id}
              icon={gender.icon}
              id={gender.id}
              title={gender.title}
              onClick={handleChange}
              isActive={filters?.gender?.[0] === gender.id}
              className={"flex-1"}
            />
          ))}
        </div>
      }
    </FilterCard>
  );
};

FilterGender.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
