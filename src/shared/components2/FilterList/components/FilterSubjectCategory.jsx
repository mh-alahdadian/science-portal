import { SquaresFour } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { Checkbox } from "../../ui/Checkbox.jsx";
import useSearchStore from "store/searchStore.js";
import { SUBJECT_CATEGORIES } from "constants/subject-category.js";

export const FilterSubjectCategory = ({ hasInfo = false, className = "" }) => {
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
      ? [...filters.subjectCategory, id]
      : filters.subjectCategory.filter((lang) => lang !== id);

    setFilters({ subjectCategory: newItems });
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={SquaresFour}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("subjectCategory")}
      title={"دسته‌بندی موضوعی"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={isFilterListOpen ? "" : "hidden"}>
          <div
            className={"grid grid-cols-2 justify-between gap-4 [direction:rtl]"}
          >
            {SUBJECT_CATEGORIES.map((item) => (
              <Checkbox
                key={item.value}
                onChange={handleChange}
                label={item.label}
                id={item.value}
                name={item.value}
                checked={filters.subjectCategory.includes(item.value)}
                className={"!justify-end [direction:ltr]"}
              />
            ))}
          </div>
        </div>
      }
    </FilterCard>
  );
};

FilterSubjectCategory.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
