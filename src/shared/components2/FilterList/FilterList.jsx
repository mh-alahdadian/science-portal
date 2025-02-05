import { useEffect, useState } from "react";
import { FilterSetting } from "./components/FilterSetting.jsx";
import { FilterSaved } from "./components/FilterSaved.jsx";
import { FilterDate } from "./components/FilterDate.jsx";
import { FilterSentiment } from "./components/FilterSentiment.jsx";
import { FilterLanguage } from "./components/FilterLanguage.jsx";
import { FilterGender } from "./components/FilterGender.jsx";
import { FilterReshare } from "./components/FilterReshare.jsx";
import { FilterImpact } from "./components/FilterImpact.jsx";
import { FilterKeyword } from "./components/FilterKeyword.jsx";
import { FilterHashtag } from "./components/FilterHashtag.jsx";
import { FilterSubjectCategory } from "./components/FilterSubjectCategory.jsx";
import { FilterResource } from "./components/FilterResource.jsx";
import useSearchStore from "../../store/searchStore.js";
import PLATFORMS from "../../constants/platforms.js";
import { FilterSpam } from "./components/FilterSpam.jsx";

export const FilterList = () => {
  const { filters, isFilterListOpen } = useSearchStore();
  const [activeFilters, setActiveFilters] = useState(
    useSearchStore.getState().getActiveFilters(),
  );

  const [validFilters, setValidFilters] = useState([
    "Saved",
    "Date",
    "Language",
    "SubjectCategory",
  ]);

  useEffect(() => {
    switch (filters.platform) {
      case PLATFORMS.INSTAGRAM:
        setValidFilters([
          "Saved",
          "Date",
          "Language",
          "SubjectCategory",
          "Source",
          "Sentiment",
          "Hashtag",
          "Keyword",
          "Reshare",
          "Impact",
          "Gender",
          "Advertisements",
        ]);
        return;
      case PLATFORMS.TELEGRAM:
        setValidFilters([
          "Saved",
          "Date",
          "Language",
          "SubjectCategory",
          "Source",
          "Hashtag",
          "Keyword",
          "Reshare",
          "Impact",
          "Advertisements",
        ]);
        return;
      case PLATFORMS.NEWS:
        setValidFilters([
          "Saved",
          "Date",
          // "Language",
          "SubjectCategory",
          "Source",
          "Keyword",
          "Impact",
        ]);
        return;
      case PLATFORMS.TWITTER:
        setValidFilters([
          "Saved",
          "Date",
          "Language",
          "SubjectCategory",
          "Source",
          "Sentiment",
          "Hashtag",
          "Keyword",
          "Reshare",
          "Impact",
          "Gender",
        ]);
        return;
      // case 'eitaa':
      //   setValidFilters(['Saved', 'Date', 'Language', 'SubjectCategory', 'Source', 'Hashtag', 'Keyword', 'Reshare']);
      //   return;
      default:
        setValidFilters(["Saved", "Date", "Language", "SubjectCategory"]);
        return;
    }
  }, [filters.platform]);

  useEffect(() => {
    console.log("filters: ", filters);
    setActiveFilters(useSearchStore.getState().getActiveFilters());
  }, [filters]);

  return (
    <div
      className={`flex flex-col ${isFilterListOpen ? "w-[400px]" : "w-[56px]"} sticky top-20 left-0 pr-1 pb-20 max-h-[100vh] overflow-y-scroll no-scrollbar gap-[16px] transition-all duration-150`}
    >
      <FilterSetting />

      {validFilters.includes("Saved") && <FilterSaved />}
      {validFilters.includes("Date") && <FilterDate />}
      {validFilters.includes("Source") && <FilterResource hasInfo={true} />}
      {validFilters.includes("Sentiment") && <FilterSentiment hasInfo={true} />}
      {validFilters.includes("Language") && <FilterLanguage />}
      {/*{validFilters.includes("Gender") && <FilterGender hasInfo={true} />}*/}
      {validFilters.includes("Hashtag") && <FilterHashtag />}
      {/*{validFilters.includes("Keyword") && <FilterKeyword />}*/}
      {validFilters.includes("SubjectCategory") && <FilterSubjectCategory />}
      {validFilters.includes("Advertisements") && <FilterSpam hasInfo={true} />}
      {/*{validFilters.includes("Impact") && <FilterImpact hasInfo={true} />}*/}
      {/*{validFilters.includes("Reshare") && <FilterReshare hasInfo={true} />}*/}
    </div>
  );
};
