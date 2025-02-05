import { toPersianNumber } from "utils/helper.js";

const Count = ({ count = "0" }) => {
  return (
    <div className="[direction:rtl] font-overline-medium text-light-neutral-text-medium flex gap-1">
      <span>{toPersianNumber(count)}</span>
      <span>محتوا</span>
    </div>
  );
};

export default Count;
