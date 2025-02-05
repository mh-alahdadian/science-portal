import SelectCategory from "../FilterSelector/SelectCategory";
import SelectLanguage from "../FilterSelector/SelectLanguage";
import SelectSentiment from "../FilterSelector/SelectSentiment";
import Divider from "../ui/Divider";
import { setCategorie, setLanguage, setSentiment } from "utils/setFilters.js";
import { FilterHashtag } from "./components/FilterHashtag";
import { FilterResource } from "./components/FilterResource";
import { Info } from "@phosphor-icons/react";
import { FilterSpam } from "./components/FilterSpam";
import PropTypes from "prop-types";
import PLATFORMS from "constants/platforms.js";

const NewsFilter = ({ setData, initialValue }) => {
  const setFilter = (key, value) => {
    setData((l) => {
      const copy = JSON.parse(JSON.stringify(l));
      copy.platform[PLATFORMS.NEWS][key] = [...value];
      return copy;
    });
  };

  return (
    <div>
      {/*<div>*/}
      {/*  <p className="font-overline-large mb-4">زبان</p>*/}
      {/*  <SelectLanguage*/}
      {/*    initialValue={initialValue?.languages}*/}
      {/*    handleChange={(news) => setLanguage("news", news, setData)}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-6">*/}
      {/*  <Divider />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <div className="flex items-center gap-1 mb-4">*/}
      {/*    <p className="font-overline-large">تحلیل احساسات</p>*/}
      {/*    <Info className="text-light-neutral-text-low" />*/}
      {/*  </div>*/}
      {/*  <SelectSentiment*/}
      {/*    initialValue={initialValue?.sentiment}*/}
      {/*    handleChange={(news) => setSentiment("news", news, setData)}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-6">*/}
      {/*  <Divider />*/}
      {/*</div>*/}
      <FilterResource
        platform={PLATFORMS.NEWS}
        handleChange={(data) => setFilter("sources", data)}
      />
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
      {/*<div className="my-6">*/}
      {/*  <Divider />*/}
      {/*</div>*/}
      {/*<FilterHashtag />*/}
      {/*<div className="my-6">*/}
      {/*  <Divider />*/}
      {/*</div>*/}

      {/*<FilterSpam />*/}
    </div>
  );
};

NewsFilter.propTypes = {
  setData: PropTypes.func.isRequired,
  initialValue: PropTypes.object.isRequired,
};

export default NewsFilter;
