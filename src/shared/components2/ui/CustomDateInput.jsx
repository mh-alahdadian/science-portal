// import { useState } from "react";
// import { Calendar } from "@phosphor-icons/react";
// import clsx from "clsx";

// const CustomDateInput = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="w-[320.5px]">
//       <div
//         className={clsx("flex flex-col gap-2 w-full relative", open && "pb-14")}
//       >
//         <div className="flex flex-col gap-2">
//           <div>
//             <span className="font-overline-large">{"تاریخ ایجاد"}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder={"placeholder"}
//               //   onChange={(e) => setText(e.target.value)}
//               value={"text"}
//               className="px-4 py-2 outline-none border border-light-neutral-border-medium-rest rounded-md placeholder:text-light-neutral-text-medium w-full font-body-large"
//             />
//             <div
//               className={clsx(
//                 "size-10 flex items-center justify-center rounded-lg cursor-pointer",
//                 open
//                   ? "bg-light-primary-background-highlight"
//                   : "bg-light-neutral-background-medium"
//               )}
//               onClick={() => setOpen((l) => !l)}
//             >
//               <Calendar size={24} color={open ? "#6F5CD1" : "black"} />
//             </div>
//           </div>
//         </div>
//         {open && <div>test</div>}
//       </div>
//     </div>
//   );
// };

// export default CustomDateInput;

// import { useState } from "react";
// import clsx from "clsx";
// import { Calendar } from "@phosphor-icons/react";
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// const CustomDateInput = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <div className="w-[320.5px]">
//       <div
//         className={clsx("flex flex-col gap-2 w-full relative", open && "pb-14")}
//       >
//         <div className="flex flex-col gap-2">
//           <div>
//             <span className="font-overline-large">{"تاریخ ایجاد"}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder={"placeholder"}
//               value={selectedDate ? selectedDate.format("YYYY/MM/DD") : ""}
//               readOnly
//               className="px-4 py-2 outline-none border border-light-neutral-border-medium-rest rounded-md placeholder:text-light-neutral-text-medium w-full font-body-large"
//             />
//             <div
//               className={clsx(
//                 "size-10 flex items-center justify-center rounded-lg cursor-pointer",
//                 open
//                   ? "bg-light-primary-background-highlight"
//                   : "bg-light-neutral-background-medium"
//               )}
//               onClick={() => setOpen((l) => !l)}
//             >
//               <Calendar size={24} color={open ? "#6F5CD1" : "black"} />
//             </div>
//           </div>
//         </div>
//         {open && (
//           <DatePicker
//             value={selectedDate}
//             onChange={setSelectedDate}
//             calendar={persian}
//             locale="fa"
//             calendarPosition="bottom-right"
//             onClose={() => setOpen(false)}
//             style={{
//               paddingLeft: "1rem",
//               width: "320.5px",
//               height: "40px",
//               paddingRight: "1rem",
//               paddingTop: "0.5rem",
//               paddingBottom: "0.5rem",
//               outline: "none",
//               border: "1px solid #E0E0E0", // Replace with the exact color of 'border-light-neutral-border-medium-rest'
//               borderRadius: "0.375rem",
//               fontFamily: "font-body-large", // Replace with the exact font family used in 'font-body-large'
//               fontSize: "1rem", // Adjust the font size as per 'font-body-large'
//               color: "#BDBDBD", // Replace with the exact color of 'placeholder:text-light-neutral-text-medium'
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomDateInput;

import { useState } from "react";
import clsx from "clsx";
import { Calendar } from "@phosphor-icons/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css"; // You can use this class to override styles

const CustomDateInput = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-[320.5px]">
      <div
        className={clsx("flex flex-col gap-2 w-full relative", open && "pb-14")}
      >
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-overline-large">{"تاریخ ایجاد"}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={"placeholder"}
              value={selectedDate ? selectedDate.format("YYYY/MM/DD") : ""}
              readOnly
              className="px-4 py-2 outline-none border border-light-neutral-border-medium-rest rounded-md placeholder:text-light-neutral-text-medium w-full font-body-large"
            />
            <div
              className={clsx(
                "size-10 flex items-center justify-center rounded-lg cursor-pointer",
                open
                  ? "bg-light-primary-background-highlight"
                  : "bg-light-neutral-background-medium"
              )}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Calendar size={24} color={open ? "#6F5CD1" : "black"} />
            </div>
          </div>
        </div>
        {open && (
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            onClose={() => setOpen(false)}
            style={{
              paddingLeft: "1rem",
              width: "320.5px",
              height: "40px",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              outline: "none",
              border: "1px solid #E0E0E0",
              borderRadius: "0.375rem",
              fontFamily: "font-body-large",
              fontSize: "1rem",
              color: "#BDBDBD",
              "--rmdp-accent": "#432FA7", // This will change the active color
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomDateInput;
