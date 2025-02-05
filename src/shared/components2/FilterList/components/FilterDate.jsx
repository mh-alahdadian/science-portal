import { Calendar } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { FilterCard } from "./FilterCard.jsx";
import { DateInput } from "../../ui/DateInput.jsx";
import useSearchStore from "store/searchStore.js";

export const FilterDate = ({ hasInfo = false, className = "" }) => {
  const { filters, setFilters, isFilterListOpen, toggleOpenClose, saveState } =
    useSearchStore();

  const handleChange = (selectedDate) => {
    setFilters({ date: selectedDate });
    saveState();
  };

  return (
    <FilterCard
      onClick={!isFilterListOpen ? toggleOpenClose : undefined}
      icon={Calendar}
      hasInfo={hasInfo}
      hasBullet={filters.date.index !== 1}
      title={"بازه زمانی جست‌و‌جو"}
      isOpen={isFilterListOpen}
      className={className}
    >
      {
        <div className={isFilterListOpen ? "" : "hidden"}>
          <div className={"w-full flex"}>
            <DateInput
              id={"date"}
              name={"date"}
              inset={true}
              size={"lg"}
              validation={"none"}
              direction={"rtl"}
              className={"flex-1"}
              field={{}}
              form={{ errors: [], touched: [] }}
              onChange={handleChange}
              value={filters.date}
            />
          </div>
        </div>
      }
    </FilterCard>
  );
};

FilterDate.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  className: PropTypes.string,
};
