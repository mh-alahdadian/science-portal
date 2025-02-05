import { useEffect, useState } from "react";
import { FilterSaved } from "components/FilterList/components/FilterSaved.jsx";
import { FilterSentiment } from "components/FilterList/components/FilterSentiment.jsx";
import { FilterLanguage } from "components/FilterList/components/FilterLanguage.jsx";
import { FilterGender } from "components/FilterList/components/FilterGender.jsx";
import { FilterReshare } from "components/FilterList/components/FilterReshare.jsx";
import { FilterImpact } from "components/FilterList/components/FilterImpact.jsx";
import { FilterHashtag } from "components/FilterList/components/FilterHashtag.jsx";
import { FilterSubjectCategory } from "components/FilterList/components/FilterSubjectCategory.jsx";
import { FilterResource } from "components/FilterList/components/FilterResource.jsx";
import useSearchStore from "../../store/searchStore.js";
import { useCompareStore } from "store/compareStore.js";
import PLATFORMS from "../../constants/platforms.js";

export const CompareFilterList = ({ index, onChange = (a, b) => {} }) => {
  const { filters, setFilters, setQuery } = useSearchStore();
  const { fields } = useCompareStore((state) => state.compare);

  const [validFilters, setValidFilters] = useState([
    "Saved",
    "Language",
    "SubjectCategory",
  ]);

  useEffect(() => {
    setFilters({ ...filters, ...fields[index]?.filters });
    setQuery(fields[index]?.q);
  }, [index]);

  useEffect(() => {
    switch (filters.platform) {
      case PLATFORMS.INSTAGRAM:
        setValidFilters([
          "Saved",
          "Language",
          "SubjectCategory",
          "Resource",
          "Sentiment",
          "Hashtag",
          "Keyword",
          "Reshare",
          "Impact",
          "Gender",
        ]);
        return;
      case PLATFORMS.TELEGRAM:
        setValidFilters([
          "Saved",
          "Language",
          "SubjectCategory",
          "Resource",
          "Hashtag",
          "Keyword",
          "Reshare",
          "Impact",
        ]);
        return;
      case PLATFORMS.NEWS:
        setValidFilters([
          "Saved",
          "SubjectCategory",
          "Source",
          // "Keyword",
          // "Impact",
        ]);
        return;
      case PLATFORMS.TWITTER:
        setValidFilters([
          "Saved",
          "Language",
          "SubjectCategory",
          "Source",
          "Sentiment",
          "Hashtag",
          // "Keyword",
          // "Reshare",
          // "Impact",
          // "Gender",
        ]);
        return;
      default:
        setValidFilters(["Saved", "Language", "SubjectCategory"]);
        return;
    }
  }, []);

  useEffect(() => {
    onChange(index, filters);
  }, [filters]);

  return (
    <div className="flex flex-col w-full sticky top-20 left-0 pr-1 pb-20 max-h-[100vh] overflow-y-scroll no-scrollbar gap-[16px] transition-all duration-150 [direction:ltr]">
      {validFilters.includes("Saved") && (
        <FilterSaved className={"!shadow-none"} />
      )}
      {validFilters.includes("Sentiment") && (
        <FilterSentiment hasInfo={true} className={"!shadow-none"} />
      )}
      {validFilters.includes("Language") && (
        <FilterLanguage className={"!shadow-none"} />
      )}
      {/* {validFilters.includes("Gender") && <FilterGender hasInfo={true} />} */}
      {/*{validFilters.includes("Reshare") && <FilterReshare hasInfo={true} />}*/}
      {/* {validFilters.includes("Impact") && <FilterImpact hasInfo={true} />} */}
      {validFilters.includes("Hashtag") && (
        <FilterHashtag className={"!shadow-none"} />
      )}
      {validFilters.includes("SubjectCategory") && (
        <FilterSubjectCategory className={"!shadow-none"} />
      )}
      {/*{validFilters.includes("Resource") && <FilterResource hasInfo={true} />}*/}
    </div>
  );
};
