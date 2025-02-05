import {
  IntersectThree,
  Smiley,
  SmileyMeh,
  SmileySad,
} from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import useSearchStore from "store/searchStore.js";
import { EmotionButton } from "components/EmotionButton/index.jsx";
import { SENTIMENTS } from "constants/sentiments.js";

export const FilterSentiment = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const handleChange = (selectedItem) => {
    if (filters.sentiment.includes(selectedItem)) {
      setFilters({
        sentiment: filters.sentiment.filter((item) => item !== selectedItem),
      });
    } else {
      setFilters({ sentiment: [...filters.sentiment, selectedItem] });
    }

    saveState();
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
    // {
    //   icon: IntersectThree,
    //   id: "all",
    //   title: "همه",
    //   className: "flex-1 text-light-primary-text-rest",
    // },
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
      <div
        className={
          isFilterListOpen ? "flex flex-row justify-between gap-4" : "hidden"
        }
      >
        {SENTIMENTS.map((emotion) => (
          <EmotionButton
            key={emotion.value}
            icon={emotion.icon}
            id={emotion.value}
            title={emotion.label}
            onClick={handleChange}
            isActive={filters?.sentiment?.includes(emotion.value)}
            className={`flex-1 ${emotion.className}`}
          />
        ))}
      </div>
    </FilterCard>
  );
};

FilterSentiment.propTypes = {
  hasInfo: PropTypes.bool,
  className: PropTypes.string,
};
