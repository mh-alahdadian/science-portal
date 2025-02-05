import { UserFocus } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { ResourceSearchInput } from "../../ui/SearchInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterResource = ({ hasInfo = false, className = "" }) => {
  const {
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
    filters,
  } = useSearchStore();

  const handleChange = (selectedItems) => {
    setFilters({ sources: selectedItems });
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={UserFocus}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("sources")}
      title={"منابع"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={isFilterListOpen ? "" : "hidden"}>
          <div className={"w-full flex"}>
            <ResourceSearchInput
              id={"sources"}
              name={"sources"}
              inset={true}
              size={"lg"}
              validation={"none"}
              direction={"rtl"}
              placeholder={"نام حساب کاربری یا خبرگزاری و ... را جست‌وجو کنید"}
              className={"flex-1"}
              field={{}}
              platform={filters.platform}
              onChange={handleChange}
              form={{ errors: [], touched: [] }}
            />
          </div>
        </div>
      }
    </FilterCard>
  );
};

FilterResource.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
