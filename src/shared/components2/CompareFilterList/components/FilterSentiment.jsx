import {
  IntersectThree,
  Smiley,
  SmileyMeh,
  SmileySad,
} from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import useSearchStore from "store/searchStore.js";

const EmotionButton = ({
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
          isActive ? "bg-light-neutral-surface-highlight" : "bg-transparent"
        } cursor-pointer h-[74px] py-[8px] px-4 rounded-[8px] [direction:rtl] ` +
        className
      }
    >
      <Icon className={"flex-1 justify-center m-auto"} size={40} />
      <span className={"flex justify-center text-body-small"}>{title}</span>
    </div>
  );
};
export const FilterSentiment = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    checkIsFilterActive,
  } = useSearchStore();

  const handleChange = (selectedItem) => {
    setFilters({ sentiment: [selectedItem] });
  };

  const emotionOptions = [
    {
      icon: SmileySad,
      id: "negative",
      title: "منفی",
      className: "flex-1 text-light-error-text-rest",
    },
    {
      icon: SmileyMeh,
      id: "neutral",
      title: "خنثی",
      className: "flex-1 text-light-neutral-text-medium",
    },
    {
      icon: Smiley,
      id: "positive",
      title: "مثبت",
      className: "flex-1 text-light-success-text-rest",
    },
  ];

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={SmileyMeh}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("sentiment")}
      title={"تحلیل احساسات"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={"flex flex-row justify-between gap-4"}>
          {emotionOptions.map((emotion) => (
            <EmotionButton
              key={emotion.id}
              icon={emotion.icon}
              id={emotion.id}
              title={emotion.title}
              onClick={handleChange}
              isActive={filters?.sentiment?.[0] === emotion.id}
              className={emotion.className}
            />
          ))}
        </div>
      }
    </FilterCard>
  );
};

FilterSentiment.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
