import { CaretLeft } from "@phosphor-icons/react";
import { parseTimeToPersian } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useLayoutContext } from "../../context/layout-context";
import notification from "../../service/api/notification";

const NotificationsCard = ({
  title = "هدیه ویژه به مناسبت سربازی وحید سرمدی",
  text = "به مناسبت سربازی وحید سرمدی تا ۷۰ درصد تخفیف روی همه پلن‌ها اعمالمی‌شود. به مناسبت سربازی وحید سرمدی تا ۷۰ درصد تخفیف روی همه پلن‌ها اعمال می‌شود. این تخفیف تا ۲۳ اردیبهشت فعال است.",
  date = "",
  unread = true,
  id,
}) => {
  const { setOpenDrawer } = useLayoutContext();
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 py-4">
      <div
        className={`shrink-0 mt-[5px] size-3 rounded-full ${
          unread ? "bg-light-warning-background-rest" : "bg-white"
        }`}
      ></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-subtitle-medium">{title}</span>
          <span className="font-overline-medium">
            {parseTimeToPersian(date)}
          </span>
        </div>
        {/* <div className="font-body-medium">{text}</div> */}
        <div className="flex flex-row-reverse">
          <button
            className="font-button-medium text-light-primary-text-rest flex gap-2"
            onClick={() => {
              setOpenDrawer(false);
              navigate(`/app/notif/Notifications/${id}`);
              unread && notification.markAsReadNotification(id);
            }}
          >
            <span>بیشتر</span>
            <CaretLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
