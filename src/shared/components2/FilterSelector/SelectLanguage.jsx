import { Checkbox } from "components/ui/Checkbox.jsx";
import PropTypes from "prop-types";
import { LANGUAGES } from "constants/languages.js";

const SelectLanguage = ({ handleChange, initialValue }) => {
  const language = initialValue || ["fa"];

  const handleCheckboxChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = isChecked
      ? [...language, id]
      : language.filter((lang) => lang !== id);

    handleChange(newItems);
  };

  return (
    <div className={"grid grid-cols-3 justify-between gap-4 [direction:rtl]"}>
      {LANGUAGES.map((lang) => (
        <Checkbox
          key={lang.value}
          onChange={handleCheckboxChange}
          label={lang.label}
          id={lang.value}
          name={lang.value}
          checked={language.includes(lang.value)}
          className={"!justify-end [direction:ltr]"}
        />
      ))}
    </div>
  );
};

SelectLanguage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  initialValue: PropTypes.array,
};
export default SelectLanguage;
