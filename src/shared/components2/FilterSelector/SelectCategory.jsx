import { SUBJECT_CATEGORIES } from "constants/subject-category.js";
import { Checkbox } from "components/ui/Checkbox.jsx";
import PropTypes from "prop-types";

const SelectCategory = ({ handleChange, initialValue }) => {
  const category = initialValue || [];

  const handleCheckboxChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = isChecked
      ? [...category, id]
      : category.filter((lang) => lang !== id);

    handleChange(newItems);
  };

  return (
    <form
      className="grid grid-cols-3 justify-between gap-4 [direction:rtl]"
      onSubmit={(e) => e.preventDefault()}
    >
      {SUBJECT_CATEGORIES.map((item) => (
        <Checkbox
          key={item.value}
          onChange={handleCheckboxChange}
          label={item.label}
          id={item.value}
          name={item.value}
          checked={category.includes(item.value)}
          className={"!justify-end [direction:ltr]"}
        />
      ))}
    </form>
  );
};

SelectCategory.propTypes = {
  handleChange: PropTypes.func.isRequired,
  initialValue: PropTypes.array,
};

export default SelectCategory;
