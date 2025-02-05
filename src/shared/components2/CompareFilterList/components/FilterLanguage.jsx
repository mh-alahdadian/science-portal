import { Globe } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { Checkbox } from "../../ui/Checkbox.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterLanguage = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const handleChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = [];

    if (id === "all") {
      newItems = isChecked ? ["all"] : [];
    } else {
      newItems = isChecked
        ? [...filters.language.filter((lang) => lang !== "all"), id]
        : filters.language.filter((lang) => lang !== id);
    }

    setFilters({ language: newItems });
  };

  const languages = [
    { label: "فارسی", id: "fa", name: "fa" },
    { label: "انگلیسی", id: "en", name: "en" },
    { label: "عربی", id: "ar", name: "ar" },
    { label: "اردو", id: "or", name: "or" },
    { label: "سایر", id: "other", name: "other" },
  ];

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Globe}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("language")}
      title={"زبان"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={"flex items-center"}>
          {languages?.map((lang) => (
            <Checkbox
              key={lang.id}
              onChange={handleChange}
              label={lang.label}
              id={lang.id}
              name={lang.name}
              checked={filters.language.includes(lang.name)}
              className={"flex-1"}
            />
          ))}
        </div>
      }
    </FilterCard>
  );
};

FilterLanguage.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
