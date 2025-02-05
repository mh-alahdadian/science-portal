import { CaretDown } from "@phosphor-icons/react";
const Section = () => {
  return (
    <div className="[direction:rtl] font-overline-medium text-light-neutral-text-medium flex gap-11 py-3 px-[10px] bg-light-neutral-background-medium rounded-lg">
      <span className="font-overline-medium text-light-neutral-text-medium">
        ترتیب نمایش
      </span>
      <div className="flex gap-2 items-center font-body-medium text-light-neutral-text-high">
        <span>تازه ترین</span>
        <CaretDown />
      </div>
    </div>
  );
};

export default Section;
