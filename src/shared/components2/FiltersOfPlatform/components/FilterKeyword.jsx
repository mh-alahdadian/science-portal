import { Keyboard } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { TagInput } from "../../ui/TagInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterKeyword = () => {
  const { filters, setFilters, saveState } = useSearchStore();

  const handleChange = (selectedItems) => {
    setFilters({ keywords: selectedItems.filter((x) => x.length > 1) });
    saveState();
  };

  return (
    <>
      <div className="flex items-center">
        <h3 className={`text-light-neutral-text-high font-overline-large ml-2`}>
          کلمات مهم و کلیدی
        </h3>
        <Keyboard size={15} className={`text-light-neutral-text-low ml-2`} />
      </div>
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
  );
};

FilterKeyword.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
