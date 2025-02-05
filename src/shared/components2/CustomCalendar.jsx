import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import persian_en from "react-date-object/locales/persian_en";
import {
  Calendar as CalendarIcon,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { useState } from "react";
import { toPersianNumber } from "utils/helper";
import clsx from "clsx";

const CustomCalendar = ({
  initialValue = null,
  title,
  onChange = (p) => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    date: "",
    format: "YYYY/MM/DD",
    persian:
      initialValue || new DateObject().convert(persian, persian_en).format(),
  });
  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  const convert = (date) => {
    let object = { date, format: selectedDate.format };

    setSelectedDate({
      date,
      persian: new DateObject(object).convert(persian, persian_en).format(),
      format: selectedDate.format,
    });

    onChange({
      date,
      persian: new DateObject(object).convert(persian, persian_en).format(),
      format: selectedDate.format,
    });
  };

  return (
    <DatePicker
      className="font-body-large custom-input-multi-date-picker"
      arrow={false}
      dateFormat="YYYY/MM/DD"
      value={selectedDate.date}
      onChange={convert}
      render={(value, openCalendar) => {
        return (
          <>
            <p className="font-overline-large pb-2">{title}</p>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen), openCalendar();
              }}
            >
              <div className="w-full h-10 border-[1px] border-light-neutral-border-medium-rest font-body-large rounded-lg flex items-center justify-start px-3">
                {toPersianNumber(selectedDate.persian)}
              </div>

              {/* <div className="w-[368.5px] h-10 border-[1px] border-light-neutral-border-medium-rest font-body-large rounded-lg flex items-center justify-start px-3">
                  {toPersianNumber(selectedDate.persian)}
                </div> */}
              <div
                className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-lg bg-light-neutral-background-medium",
                  isOpen && "bg-light-primary-background-highlight",
                )}
              >
                <CalendarIcon
                  size={24}
                  className={clsx("", isOpen && "text-light-primary-text-rest")}
                />
              </div>
            </div>
          </>
        );
      }}
      renderButton={(direction, handleClick) => (
        <button onClick={handleClick}>
          {direction === "right" ? (
            <CaretLeft size={20} />
          ) : (
            <CaretRight size={20} />
          )}
        </button>
      )}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-center"
      weekDays={weekDays}
    />
  );
};

export default CustomCalendar;
