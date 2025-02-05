import SelectLanguage from "../FilterSelector/SelectLanguage";
import Divider from "../ui/Divider";
import { Info } from "@phosphor-icons/react";
import SelectSentiment from "../FilterSelector/SelectSentiment";
import SelectCategory from "../FilterSelector/SelectCategory";
import { FilterHashtag } from "./components/FilterHashtag";
import { FilterResource } from "./components/FilterResource";
import PropTypes from "prop-types";
import PLATFORMS from "constants/platforms.js";

const TwitterFilter = ({ setData, initialValue }) => {
  const setFilter = (key, value) => {
    setData((l) => {
      const copy = JSON.parse(JSON.stringify(l));
      copy.platform[PLATFORMS.TWITTER][key] = [...value];
      return copy;
    });
  };

  return (
    <div>
      <div>
        <p className="font-overline-large mb-4">زبان</p>
        <SelectLanguage
          initialValue={initialValue?.languages || ["fa"]}
          handleChange={(data) => setFilter("languages", data)}
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
          initialValue={initialValue?.sentiment || []}
          handleChange={(data) => setFilter("sentiment", data)}
        />
      </div>
      <div className="my-6">
        <Divider />
      </div>
      <div>
        <p className="font-overline-large mb-4">دسته‌بندی موضوعی</p>
        <SelectCategory
          initialValue={initialValue?.categories || []}
          handleChange={(data) => setFilter("categories", data)}
        />
      </div>
      <div className="my-6">
        <Divider />
      </div>
      <FilterHashtag
        initialValue={initialValue?.hashtags || []}
        handleChange={(data) => setFilter("hashtags", data)}
      />
      <div className="my-6">
        <Divider />
      </div>
      <FilterResource
        platform={PLATFORMS.TWITTER}
        handleChange={(data) => setFilter("sources", data)}
      />
    </div>
  );
};

TwitterFilter.propTypes = {
  setData: PropTypes.func,
  initialValue: PropTypes.object,
};

export default TwitterFilter;
