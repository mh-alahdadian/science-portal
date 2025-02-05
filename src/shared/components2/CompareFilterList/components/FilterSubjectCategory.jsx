import { SquaresFour } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { Checkbox } from "../../ui/Checkbox.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterSubjectCategory = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    checkIsFilterActive,
  } = useSearchStore();

  const selectCategories = [
    { label: "Culture/Art", name: "فرهنگی و هنری" },
    { label: "Economic", name: "اقتصادی" },
    { label: "Political", name: "سیاسی" },
    { label: "Religion", name: "مذهبی" },
    { label: "Roozmare", name: "روزمره" },
    { label: "Science/Tech/Health", name: "علمی، فناوری و سلامت" },
    { label: "Security and Defense", name: "امنیتی و دفاعی" },
    { label: "Social", name: "اجتماعی" },
    { label: "Sport", name: "ورزشی" },
  ];
  const handleChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = [];

    if (id === "all") {
      newItems = isChecked ? ["all"] : [];
    } else {
      newItems = isChecked
        ? [...filters.subjectCategory.filter((lang) => lang !== "all"), id]
        : filters.subjectCategory.filter((lang) => lang !== id);
    }
    setFilters({ subjectCategory: newItems });
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={SquaresFour}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("subjectCategory")}
      title={"دسته‌بندی موضوعی"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className="flex flex-row items-center flex-wrap justify-between gap-4">
          {selectCategories?.map((item) => (
            <div key={item?.label}>
              <Checkbox
                onChange={handleChange}
                label={item?.name}
                id={item?.label}
                name={item?.label}
                checked={filters.subjectCategory.includes(item?.label)}
                className={"flex-1"}
              />
            </div>
          ))}
          {/* <div className={"flex flex-row justify-between gap-4"}>
            <Checkbox
              onChange={handleChange}
              label={"اجتماعی"}
              id={"ejtemaie"}
              name={"ejtemaie"}
              checked={filters.subjectCategory.includes("ejtemaie")}
              className={"flex-1"}
            />
            <Checkbox
              onChange={handleChange}
              label={"همه"}
              id={"all"}
              name={"all"}
              checked={filters.subjectCategory.includes("all")}
              className={"flex-1"}
            />
          </div>
          <div className={"flex flex-row justify-between gap-4 mt-2"}>
            <Checkbox
              onChange={handleChange}
              label={"سیاسی"}
              id={"siasi"}
              name={"siasi"}
              checked={filters.subjectCategory.includes("siasi")}
              className={"flex-1"}
            />
            <Checkbox
              onChange={handleChange}
              label={"ورزشی"}
              id={"varzeshi"}
              name={"varzeshi"}
              checked={filters.subjectCategory.includes("varzeshi")}
              className={"flex-1"}
            />
          </div>
          <div className={"flex flex-row justify-between gap-4 mt-2"}>
            <Checkbox
              onChange={handleChange}
              label={"علمی"}
              id={"elmi"}
              name={"elmi"}
              checked={filters.subjectCategory.includes("elmi")}
              className={"flex-1"}
            />
            <Checkbox
              onChange={handleChange}
              label={"اقتصادی"}
              id={"eghtesadi"}
              name={"eghtesadi"}
              checked={filters.subjectCategory.includes("eghtesadi")}
              className={"flex-1"}
            />
          </div>
          <div className={"flex flex-row justify-between gap-4 mt-2"}>
            <Checkbox
              onChange={handleChange}
              label={"روزمره"}
              id={"roozmare"}
              name={"roozmare"}
              checked={filters.subjectCategory.includes("roozmare")}
              className={"flex-1"}
            />
            <Checkbox
              onChange={handleChange}
              label={"هنر و رسانه"}
              id={"honar"}
              name={"honar"}
              checked={filters.subjectCategory.includes("honar")}
              className={"flex-1"}
            />
          </div>
          <div className={"flex flex-row justify-between gap-4 mt-2"}>
            <Checkbox
              onChange={handleChange}
              label={"فرهنگ"}
              id={"farhang"}
              name={"farhang"}
              checked={filters.subjectCategory.includes("farhang")}
              className={"flex-1"}
            />
            <Checkbox
              onChange={handleChange}
              label={"بین الملل"}
              id={"international"}
              name={"international"}
              checked={filters.subjectCategory.includes("international")}
              className={"flex-1"}
            />
          </div> */}
        </div>
      }
    </FilterCard>
  );
};

FilterSubjectCategory.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
