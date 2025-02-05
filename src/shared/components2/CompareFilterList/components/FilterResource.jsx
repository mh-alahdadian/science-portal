import { UserFocus } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { ResourceSearchInput } from "../../ui/SearchInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterResource = ({ hasInfo = false, className = "" }) => {
  const { setFilters, isFilterListOpen, toggleOpenClose, checkIsFilterActive } =
    useSearchStore();

  const handleChange = (selectedItems) => {
    setFilters({ sources: selectedItems });
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
            onChange={handleChange}
            form={{ errors: [], touched: [] }}
            caption={"بعد از نوشتن هر کلمه از , استفاده کنید."}
          />
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
