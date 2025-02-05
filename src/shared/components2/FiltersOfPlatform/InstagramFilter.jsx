import SelectLanguage from "../FilterSelector/SelectLanguage";
import Divider from "../ui/Divider";
import { Info } from "@phosphor-icons/react";
import SelectContainCopy from "../FilterSelector/SelectContainCopy";
import SelectSentiment from "../FilterSelector/SelectSentiment";
import SelectCategory from "../FilterSelector/SelectCategory";
import SelectGender from "../FilterSelector/SelectGender";
import {
  setCategorie,
  setContainCopy,
  setGender,
  setLanguage,
  setSentiment,
} from "../../utils/setFilters";
import { FilterKeyword } from "./components/FilterKeyword";
import { FilterHashtag } from "./components/FilterHashtag";
import { FilterResource } from "./components/FilterResource";

const InstagramFilter = ({ setData, initialValue }) => {
  return (
    <div>
      <div>
        <p className="font-overline-large mb-4">زبان</p>
        <SelectLanguage
          initialValue={initialValue?.languages}
          handleChange={(x) => setLanguage("instagram", x, setData)}
        />
      </div>

      <div className="my-6">
        <Divider />
      </div>

      <div>
        <div className="flex items-center gap-1 mb-4">
          <p className="font-overline-large">اصالت محتوا</p>
          <Info className="text-light-neutral-text-low" />
        </div>
        <SelectContainCopy
          initialValue={initialValue?.contain_copy}
          handleChange={(x) => setContainCopy("instagram", x, setData)}
        />
      </div>

      <div className="my-6">
        <Divider />
      </div>

      <div>
        <div className="flex items-center gap-1 mb-4">
          <p className="font-overline-large">تحلیل احساسات</p>
          <Info className="text-light-neutral-text-low" />
        </div>
        <SelectSentiment
          initialValue={initialValue?.sentiment}
          handleChange={(x) => setSentiment("instagram", x, setData)}
        />
      </div>

      <div className="my-6">
        <Divider />
      </div>

      <div>
        <p className="font-overline-large mb-4">دسته‌بندی موضوعی</p>
        <SelectCategory
          initialValue={initialValue?.categories}
          handleChange={(x) => setCategorie("instagram", x, setData)}
        />
      </div>

      <div className="my-6">
        <Divider />
      </div>

      <div>
        <div className="flex items-center gap-1 mb-4">
          <p className="font-overline-large">جنسیت کاربران</p>
          <Info className="text-light-neutral-text-low" />
        </div>
        <SelectGender
          initialValue={initialValue?.gender}
          handleChange={(x) => setGender("instagram", x, setData)}
        />
      </div>
      <div className="my-6">
        <Divider />
      </div>
      <FilterKeyword />
      <div className="my-6">
        <Divider />
      </div>
      <FilterHashtag />
      <div className="my-6">
        <Divider />
      </div>
      <FilterResource />
    </div>
  );
};

export default InstagramFilter;
