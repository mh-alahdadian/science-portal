import { useEffect, useState } from "react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { DropDownInput } from "../../ui/DropDownInput.jsx";
import useSearchStore from "store/searchStore.js";
import filter from "service/api/filter";

export const FilterSaved = ({
  icon: Icon,
  hasInfo = false,
  className = "",
}) => {
  const { filters, setFilters, isFilterListOpen, toggleOpenClose, setQuery } =
    useSearchStore();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(); // Track the selected filter

  const fetchFilters = async (page) => {
    try {
      const res = await filter.get(page);
      const { data } = res?.data;
      const mergedData = [...(data?.user || []), ...(data?.group || [])];
      setFilterList(mergedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const resetFilters = () => {
    // setQuery("");
    setFilters({
      sentiment: [],
      gender: ["all"],
      subjectCategory: [],
      language: [],
      sources: [],
      keywords: [],
      hashtags: [],
      page: 1,
      sort: "",
      sort_type: "نزولی",
    });
  };

  const handleDropdownChange = (selectedItems) => {
    const selectedFilterItem = filterList.find(
      (filter) => filter.id === selectedItems[0],
    );
    setSelectedFilter(selectedFilterItem);
  };

  const findSavedFilterPlatforms = () => {
    return Object.keys(selectedFilter?.params?.platform || []);
  };

  const setSavedFilter = (targetPlatform) => {
    const platformFilters = selectedFilter.params?.platform?.[targetPlatform];
    setFilters({
      platform: targetPlatform,
      language: platformFilters?.languages || [],
      sentiment: platformFilters?.sentiment || [],
      gender: platformFilters?.gender || [],
      keywords: platformFilters?.keywords || [],
      hashtags: platformFilters?.hashtags || [],
      subjectCategory: platformFilters?.categories || [],
      sources: platformFilters?.sources || [],
    });
    setQuery(selectedFilter.params?.q || "");
  };

  useEffect(() => {
    if (selectedFilter) {
      const savedFilterPlatforms = findSavedFilterPlatforms();
      if (savedFilterPlatforms.length > 0)
        setFilters({ platform: savedFilterPlatforms[0] });
      setSavedFilter(filters.platform);
    }
  }, [selectedFilter]);

  useEffect(() => {
    // Apply or reset filters when the platform changes
    if (selectedFilter) {
      if (findSavedFilterPlatforms().includes(filters.platform)) {
        // Apply filters for the current platform
        setSavedFilter(filters.platform);
      } else {
        // Disable filters for platforms not in the selected filter
        resetFilters();
      }
    }
  }, [filters.platform]);

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Funnel}
      hasInfo={hasInfo}
      hasBullet={!!selectedFilter}
      title={"فیلترهای پیش‌ساخته"}
      isOpen={isFilterListOpen}
      className={className}
    >
      <div className={isFilterListOpen ? "" : "hidden"}>
        <div className={"w-full flex"}>
          <DropDownInput
            id={"savedFilter"}
            name={"savedFilter"}
            inset={true}
            headingIcon={<MagnifyingGlass />}
            size={"lg"}
            validation={"none"}
            direction={"rtl"}
            placeholder={"عنوان فیلتر را جست‌وجو کنید"}
            className={"flex-1"}
            field={{}}
            form={{ errors: [], touched: [] }}
            onChange={handleDropdownChange}
            selectedItems={selectedFilters}
            setSelectedItems={setSelectedFilters}
            dropdownArray={filterList}
            actionLink={"/app/filter/create"}
            singleSelect={true}
            actionText={"ساخت فیلتر جدید"}
          />
        </div>
      </div>
    </FilterCard>
  );
};

FilterSaved.propTypes = {
  icon: PropTypes.elementType,
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
