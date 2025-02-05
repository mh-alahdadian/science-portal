import { Hash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { TagInput } from "../../ui/TagInput.jsx";

export const FilterHashtag = ({ handleChange, initialValue }) => {
  // const { filters, setFilters, saveState } = useSearchStore();

  // const handleChange = (selectedItems) => {
  //   // setFilters({ hashtags: selectedItems.filter((x) => x.length > 1) });
  //   // saveState();
  //   handleChange(selectedItems);
  // };

  return (
    <>
      <div className="flex items-center">
        <h3 className={`text-light-neutral-text-high font-overline-large ml-2`}>
          هشتگ‌های کلیدی
        </h3>
        <Hash size={15} className={`text-light-neutral-text-low ml-2`} />
      </div>{" "}
      <div className={"w-full flex mt-4"}>
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
          initialTags={initialValue}
          className={"flex-1"}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

FilterHashtag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  initialValue: PropTypes.object,
};
