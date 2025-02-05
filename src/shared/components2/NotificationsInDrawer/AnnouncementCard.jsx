import { Alarm, NewspaperClipping } from "@phosphor-icons/react";
import AlertBtn from "./AlertBtn";
import BulletinBtn from "./BulletinBtn";
import { parseTimeToPersian } from "../../utils/helper";
import notification from "../../service/api/notification";
import { useState } from "react";

const AnnouncementCard = ({
  type = "alert",
  title = "",
  description = "",
  read = false,
  date,
  link,
  id,
  readNotifHandler,
}) => {
  // const readNotifHandler = async () => {
  //   try {
  //     await notification.markAsReadNotification(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="py-4 flex gap-2">
      <div
        className={`size-8 bg-light-neutral-surface-highlight rounded-lg border-2 ${
          read
            ? "border-light-neutral-surface-highlight"
            : "border-light-warning-border-rest"
        } flex items-center justify-center`}
      >
        {type === "alert" ? (
          <Alarm size={18} color="#00000080" />
        ) : (
          <NewspaperClipping size={18} color="#00000080" />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="font-subtitle-medium">
          {title === "خطا در ایجاد فایل بولتن" ? title : description}
        </div>
        <div className="font-overline-medium"> {parseTimeToPersian(date)}</div>
        <div className="flex flex-row-reverse">
          {type === "alert" ? (
            <AlertBtn read={read} link={link} id={id} />
          ) : (
            <BulletinBtn
              link={link}
              id={`${id}`}
              showMarkAsSeen={true}
              readNotifHandler={() => readNotifHandler(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
