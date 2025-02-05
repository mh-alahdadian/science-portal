import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import PropTypes from "prop-types";

const RangeDatePicker = ({ from, to, onChange = () => {} }) => {
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const value = {
    from:
      from ||
      new Date(new Date().getTime() - oneDayInMillis).setHours(0, 0, 0, 0),
    to: to || new Date(),
  };
  const [fromValue, setFromValue] = useState(new Date(value?.from));
  const [toValue, setToValue] = useState(new Date(value?.to));
  const [values, setValues] = useState([fromValue, toValue]);

  const handleDateChange = (e) => {
    if (e.length < 2) return;
    setFromValue(new Date(new Date(e[0]).setHours(0, 0, 0, 0)));
    setToValue(new Date(new Date(e[1]).setHours(23, 59, 59, 0)));
    onChange({
      from: new Date(new Date(e[0]).setHours(0, 0, 0, 0)),
      to: new Date(new Date(e[1]).setHours(23, 59, 59, 0)),
    });
  };

  useEffect(() => {
    onChange({ ...value });
  }, []);

  return (
    <DatePicker
      value={values}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      range
      containerClassName={"datepicker-container"}
      onChange={handleDateChange}
      dateSeparator="  تا  "
      renderButton={(direction, handleClick) => (
        <button onClick={handleClick}>
          {direction === "right" ? (
            <CaretLeft size={20} />
          ) : (
            <CaretRight size={20} />
          )}
        </button>
      )}
    />
  );
};

RangeDatePicker.propTypes = {
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default RangeDatePicker;
