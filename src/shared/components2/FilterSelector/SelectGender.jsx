import {GenderFemale, GenderMale, GenderNeuter} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import {selector} from "./utils";

const SelectGender = ({handleChange, initialValue}) => {
  const [gender, setGender] = useState(initialValue || []);

  useEffect(() => {
    handleChange(gender);
  }, [gender]);

  return (
    <div
      className="flex justify-between *:flex *:flex-col *:items-center *:justify-center *:size-20 *:rounded-lg *:transition-all *:duration-300 *:cursor-pointer">
      <div
        className={`${
          gender.includes("male") ? "bg-light-neutral-surface-highlight" : ""
        }`}
        style={{
          color: gender.includes("male") ? "#6F5CD1" : "#00000059",
        }}
        onClick={() => selector("male", setGender)}
      >
        <GenderMale className="size-10"/>
        <span className="font-body-small">مرد</span>
      </div>

      <div
        className={`${
          gender.includes("female") ? "bg-light-neutral-surface-highlight" : ""
        }`}
        style={{
          color: gender.includes("female") ? "#6F5CD1" : "#00000059",
        }}
        onClick={() => selector("female", setGender)}
      >
        <GenderFemale className="size-10"/>
        <span className="font-body-small">زن</span>
      </div>

      <div
        className={`${
          gender.includes("unk") ? "bg-light-neutral-surface-highlight" : ""
        }`}
        style={{
          color: gender.includes("unk") ? "#6F5CD1" : "#00000059",
        }}
        onClick={() => selector("unk", setGender)}
      >
        <GenderNeuter className="size-10"/>
        <span className="font-body-small">نامشخص</span>
      </div>
    </div>
  );
};

export default SelectGender;
