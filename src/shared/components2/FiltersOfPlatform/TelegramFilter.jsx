import Divider from "../ui/Divider";
import SelectLanguage from "../FilterSelector/SelectLanguage";
import { Info } from "@phosphor-icons/react";
import SelectCategory from "../FilterSelector/SelectCategory";
import SelectSentiment from "../FilterSelector/SelectSentiment";
import {
  setCategorie,
  setLanguage,
  setSentiment,
} from "../../utils/setFilters";
import { FilterHashtag } from "./components/FilterHashtag";
import { FilterResource } from "./components/FilterResource";
import { FilterSpam } from "./components/FilterSpam";

const TelegramFilter = ({ setData, initialValue }) => {
  return (
    <div>
      <div>
        <p className="font-overline-large mb-4">زبان</p>
        <SelectLanguage
          initialValue={initialValue?.languages}
          handleChange={(telegram) =>
            setLanguage("telegram", telegram, setData)
          }
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
          handleChange={(telegram) =>
            setSentiment("telegram", telegram, setData)
          }
        />
      </div>
      <div className="my-6">
        <Divider />
      </div>
      <div>
        <p className="font-overline-large mb-4">دسته‌بندی موضوعی</p>
        <SelectCategory
          initialValue={initialValue?.categories}
          handleChange={(telegram) =>
            setCategorie("telegram", telegram, setData)
          }
        />
      </div>
      <div className="my-6">
        <Divider />
      </div>
      <FilterHashtag />
      <div className="my-6">
        <Divider />
      </div>
      <FilterResource />
      <div className="my-6">
        <Divider />
      </div>
      <FilterSpam />
    </div>
  );
};

export default TelegramFilter;
