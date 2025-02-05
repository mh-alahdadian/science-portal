import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";

const Status = ({ status, onClick }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none" onClick={onClick}>
      <div className="" style={{ color: status ? "#17968C" : "#BE223C" }}>
        {status ? (
          <ToggleRight size={18} weight="fill" />
        ) : (
          <ToggleLeft size={18} />
        )}
      </div>
      <div
        className="font-body-medium"
        style={{ color: status ? "#17968C" : "#BE223C" }}
      >
        {status ? <div>فعال</div> : <div>غیر فعال</div>}
      </div>
    </div>
  );
};

export default Status;
