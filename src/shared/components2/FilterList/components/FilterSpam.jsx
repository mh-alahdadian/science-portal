import { ShareFat, Tag } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { Checkbox } from "../../ui/Checkbox.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterSpam = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const advertisementOptions = [
    { label: "تبلیغات", id: "adv", name: "adv" },
    { label: "بدون تبلیغات", id: "non-adv", name: "non-adv" },
  ];

  const handleChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = [];

    newItems = isChecked ? [id] : [];

    setFilters({ adv: newItems });
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Tag}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("adv")}
      title={"محتوای تبلیغاتی"}
      isOpen={isFilterListOpen}
      className={className}
    >
      <div
        className={
          isFilterListOpen ? "flex flex-row justify-between gap-4" : "hidden"
        }
      >
        {advertisementOptions.map((option) => (
          <Checkbox
            key={option.id}
            onChange={handleChange}
            label={option.label}
            id={option.id}
            name={option.name}
            checked={filters?.adv?.includes(option?.name)}
            className={"flex-1 py-3"}
          />
        ))}
      </div>
    </FilterCard>
  );
};

FilterSpam.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
