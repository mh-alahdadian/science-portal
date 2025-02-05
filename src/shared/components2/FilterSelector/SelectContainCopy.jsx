import { useEffect, useState } from "react";
import { selector } from "./utils";

const SelectContainCopy = ({ handleChange, initialValue }) => {
  const [containCopy, setContainCopy] = useState(initialValue || []);

  useEffect(() => {
    handleChange(containCopy);
  }, [containCopy]);
  return (
    <form
      className="grid grid-cols-3 gap-y-4 gap-x-40 font-body-small"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="size-4"
          value="publish"
          name="contain_copy"
          checked={containCopy.includes("publish")}
          onChange={() => selector("publish", setContainCopy)}
        />
        <span>تولیدی</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="size-4"
          value="republish"
          name="contain_copy"
          checked={containCopy.includes("republish")}
          onChange={() => selector("republish", setContainCopy)}
        />
        <span>بازنشر</span>
      </label>
    </form>
  );
};

export default SelectContainCopy;
