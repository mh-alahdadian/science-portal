import { useEffect, useState } from "react";
import { Lightning } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import CMultiRangeSlider from "../../ui/CMultiRangeSlider/CMultiRangeSlider.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterImpact = ({ hasInfo = false, className = "" }) => {
  const {
    filters,
    setFilters,
    isFilterListOpen,
    toggleOpenClose,
    saveState,
    checkIsFilterActive,
  } = useSearchStore();

  const values = ["lowest", "low", "medium", "high", "highest"];

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);

  const handleChange = (e) => {
    let result =
      values.slice(e.minValue - 1, e.maxValue).length === 5
        ? ["all"]
        : values.slice(e.minValue - 1, e.maxValue);
    setFilters({ impact: result });
    saveState();
  };

  useEffect(() => {
    if (filters.impact[0] === "all") {
      setMinValue(0);
      setMaxValue(5);
    } else {
      setMinValue(
        filters.impact.length > 0 ? values.indexOf(filters.impact[0]) + 1 : 0,
      );
      setMaxValue(
        filters.impact.length > 0
          ? values.indexOf(filters.impact[0]) + filters.impact.length
          : 5,
      );
    }
  }, [filters.impact]);

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Lightning}
      hasInfo={hasInfo}
      hasBullet={checkIsFilterActive("impact")}
      title={"ضریب نفوذ / میزان اهمیت"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={isFilterListOpen ? "" : "hidden"}>
          <CMultiRangeSlider
            min={1}
            max={5}
            step={1}
            minValue={minValue}
            maxValue={maxValue}
            canMinMaxValueSame={false}
            labels={["بسیار کم", "کم", "متوسط", "زیاد", "بسیار زیاد"]}
            onChange={handleChange}
          ></CMultiRangeSlider>
        </div>
      }
    </FilterCard>
  );
};

FilterImpact.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
