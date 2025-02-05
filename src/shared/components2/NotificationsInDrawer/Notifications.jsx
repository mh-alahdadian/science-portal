import React, { useEffect, useState } from "react";
import NotificationsCard from "./NotificationsCard";
import queryString from "query-string";
import notification from "../../service/api/notification";

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    const query = queryString.stringify({
      page: 1,
      count: 5,
      type: "notification",
      status: "unread",
    });
    notification
      .get(query)
      .then((res) => {
        setNotifs(res.data.data.notifications);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="divide-y-2">
      {notifs.length ? (
        notifs?.map(({ title, created_at, unread, id }) => (
          <NotificationsCard
            key={id}
            title={title}
            date={created_at}
            unread={unread}
            id={id}
          />
        ))
      ) : (
        <div className="h-full flex items-center justify-center font-subtitle-medium">
          اطلاعیه‌ای برای نمایش وجود ندارد
        </div>
      )}
    </div>
  );
};

export default React.memo(Notifications);
