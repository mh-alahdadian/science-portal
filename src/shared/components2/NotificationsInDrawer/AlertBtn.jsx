import { CaretLeft } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLayoutContext } from "../../context/layout-context";
import notification from "../../service/api/notification";

const AlertBtn = ({ read = false, link, id }) => {
  const { setOpenDrawer } = useLayoutContext();
  const navigate = useNavigate();

  return (
    <button
      className={`${
        read ? "bg-white" : "bg-light-neutral-background-medium"
      } rounded-lg px-3 py-2 flex gap-2`}
      onClick={() => {
        setOpenDrawer(false);
        !read && notification.markAsReadNotification(id);
        navigate(`alert/list/${link}`);
      }}
    >
      <span className="font-button-medium">نمایش هشدار</span>
      <CaretLeft />
    </button>
  );
};

export default AlertBtn;
