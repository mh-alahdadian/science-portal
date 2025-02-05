import { Tag } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import useSearchStore from "store/searchStore.js";
import { Checkbox } from "components/ui/Checkbox.jsx";
import { FilterCard } from "components/CompareFilterList/components/FilterCard.jsx";

export const FilterSpam = () => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const advertisementOptions = [
    { label: "تبلیغات", id: "spam", name: "spam" },
    { label: "بدون تبلیغات", id: "non-spam", name: "non-spam" },
    { label: "همه", id: "all", name: "all" },
  ];

  const handleChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = [];

    if (id === "all") {
      newItems = isChecked ? ["all"] : [];
    } else {
      newItems = isChecked
        ? [...filters.spam.filter((lang) => lang !== "all"), id]
        : filters.spam.filter((lang) => lang !== id);
    }

    setFilters({ spam: newItems });
    saveState();
  };
  return (
    <>
      <FilterCard
        onClick={!isFilterListOpen ? toggleOpenClose : undefined}
        icon={Tag}
        hasBullet={checkIsFilterActive("spam")}
        title={"محتوای تبلیغاتی"}
        isOpen={isFilterListOpen}
      >
        <div className={"flex flex-row justify-between gap-4"}>
          {advertisementOptions.map((option) => (
            <Checkbox
              key={option.id}
              onChange={handleChange}
              label={option.label}
              id={option.id}
              name={option.name}
              checked={filters?.spam?.includes(option?.name)}
              className={"flex-1 py-3"}
            />
          ))}
        </div>
      </FilterCard>
    </>
  );
};

FilterSpam.propTypes = {
  hasBullet: PropTypes.bool,
};
