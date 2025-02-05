import { useEffect, useState } from "react";

export const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  className = "",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange({ id: id || name, isChecked: !isChecked });
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className={`flex items-center justify-end ${className}`}>
      <label className={"font-body-small"}>{label}</label>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-500 mx-2"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
