import { useState } from "react";

const ToggleInput = ({
  title,
  description,
  onColor = "bg-[#65558F]",
  offColor = "bg-gray-300",
  isOn = false,
  onChange = () => {},
  className = "flex items-center gap-3 w-fit",
}) => {
  const [checked, setChecked] = useState(isOn);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className={className} onClick={handleChange}>
      <div
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
          checked ? onColor : offColor
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
            checked ? "translate-x-0" : "translate-x-[-23px]"
          }`}
        ></div>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-button-large">{title}</p>
        <p className="font-button-medium text-light-neutral-text-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToggleInput;
