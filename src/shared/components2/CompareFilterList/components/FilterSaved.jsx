import { useEffect, useState } from "react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { DropDownInput } from "../../ui/DropDownInput.jsx";
import useSearchStore from "store/searchStore.js";
import filter from "service/api/filter";
import { useCompareStore } from "store/compareStore.js";

export const FilterSaved = ({
  icon: Icon,
  hasInfo = false,
  className = "",
}) => {
  const { setFilters, setQuery } = useSearchStore();
  const { platform } = useCompareStore((state) => state.compare);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(); // Track the selected filter

  const fetchFilters = async (page) => {
    try {
      const res = await filter.get(page);
      const { data } = res?.data;
      const filteredBasedOnPlatform =
        data?.user?.filter((item) => {
          return Object.keys(item.params?.platform).includes(platform);
        }) || [];
      setFilterList(filteredBasedOnPlatform);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleDropdownChange = (selectedItems) => {
    const selectedFilterItem = filterList.find(
      (filter) => filter.id === selectedItems[0],
    );
    setSelectedFilter(selectedFilterItem);
  };

  const setSavedFilter = (targetPlatform) => {
    const platformFilters = selectedFilter.params?.platform?.[targetPlatform];
    setFilters({
      platform: targetPlatform,
      language: platformFilters.languages || [],
      sentiment: platformFilters.sentiment || [],
      gender: platformFilters.gender || [],
      keywords: platformFilters.keywords || [],
      hashtags: platformFilters.hashtags || [],
      subjectCategory: platformFilters.categories || [],
      sources: platformFilters.sources || [],
    });
    setQuery(selectedFilter.params?.q || "");
  };

  useEffect(() => {
    if (selectedFilter) {
      setSavedFilter(platform);
    }
  }, [selectedFilter]);

  return (
    <FilterCard
      icon={Funnel}
      hasInfo={hasInfo}
      hasBullet={!!selectedFilter}
      title={"فیلترهای پیش‌ساخته"}
      isOpen={true}
      className={className}
    >
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
    </FilterCard>
  );
};

FilterSaved.propTypes = {
  icon: PropTypes.elementType,
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
