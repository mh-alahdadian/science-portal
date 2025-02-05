import { Download } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import notification from "../../service/api/notification";
import { CButton } from "../ui/CButton";
import { useLayoutContext } from "context/layout-context";
import CronJob, { useCronJob } from "context/cronJob.jsx";
import { useContext } from "react";

const BulletinBtn = ({ link, id, readNotifHandler, showMarkAsSeen }) => {
  const { fetchNotifications } = useCronJob();
  const handleDownloadClick = async () => {
    try {
      await notification.markAsReadNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadClick = async () => {
    try {
      await readNotifHandler(id);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center flex-row-reverse gap-1">
      {link && (
        <a
          href={`${link}`}
          className="bg-light-success-background-rest rounded-lg px-3 py-2 flex gap-2 text-light-neutral-text-white cursor-pointer"
          target={"_blank"}
          onClick={handleDownloadClick}
          rel="noreferrer"
        >
          <Download />
          <span className="font-button-medium">دانلود گزارش</span>
        </a>
      )}
      {showMarkAsSeen === true && (
        <div className="w-fit" onClick={handleReadClick}>
          <CButton size="sm" mode="outline" role="neutral">
            خوانده شد
          </CButton>
        </div>
      )}
    </div>
  );
};

BulletinBtn.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
};

export default BulletinBtn;
