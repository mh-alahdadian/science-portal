import { Globe } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { Checkbox } from "../../ui/Checkbox.jsx";
import useSearchStore from "store/searchStore.js";
import { LANGUAGES } from "constants/languages.js";

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
    let newItems = isChecked
      ? [...filters.language, id]
      : filters.language.filter((lang) => lang !== id);

    setFilters({ language: newItems });
    saveState();
  };

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
        <div className={isFilterListOpen ? "" : "hidden"}>
          <div
            className={"grid grid-cols-3 justify-around gap-4 [direction:rtl]"}
          >
            {LANGUAGES.map((lang) => (
              <Checkbox
                key={lang.value}
                onChange={handleChange}
                label={lang.label}
                id={lang.value}
                name={lang.value}
                checked={filters.language.includes(lang.value)}
                className={"!justify-end [direction:ltr]"}
              />
            ))}
          </div>
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
