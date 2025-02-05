import { Keyboard } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { TagInput } from "../../ui/TagInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterKeyword = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const handleChange = (selectedItems) => {
    setFilters({ keywords: selectedItems.filter((x) => x.length > 1) });
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Keyboard}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("keyword")}
      title={"کلمات مهم و کلیدی"}
      isOpen={isFilterListOpen}
      className={className}
    >
      <>
        <div className={"w-full flex mt-4"}>
          <TagInput
            id={"keywords"}
            name={"keywords"}
            inset={true}
            size={"lg"}
            validation={"none"}
            direction={"rtl"}
            placeholder={"کلمه مورد نظر را بنویسید"}
            caption={"بعد از نوشتن هر کلمه از Enter استفاده کنید"}
            className={"flex-1"}
            initialTags={filters.keywords}
            onChange={handleChange}
          />
        </div>
      </>
    </FilterCard>
  );
};

FilterKeyword.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
