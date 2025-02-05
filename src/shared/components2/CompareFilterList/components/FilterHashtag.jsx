import { Hash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { TagInput } from "../../ui/TagInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterHashtag = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    checkIsFilterActive,
  } = useSearchStore();

  const handleChange = (selectedItems) => {
    setFilters({ hashtags: selectedItems.filter((x) => x.length > 1) });
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Hash}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("hashtag")}
      title={"هشتگ‌های کلیدی"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <>
          <div className={"w-full flex"}>
            <TagInput
              id={"hashtag"}
              name={"hashtag"}
              inset={true}
              size={"lg"}
              validation={"none"}
              direction={"rtl"}
              placeholder={"عبارت هشتگ مورد نظر را بنویسید"}
              caption={
                "بعد از نوشتن هر کلمه از Enter استفاده کنید. نیازی به استفاده از # نیست"
              }
              initialTags={filters.hashtags}
              className={"flex-1"}
              onChange={handleChange}
            />
          </div>
        </>
      }
    </FilterCard>
  );
};

FilterHashtag.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
