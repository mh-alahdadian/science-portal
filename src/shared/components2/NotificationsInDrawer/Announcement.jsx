import { useEffect, useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import SegmentTab from "../ui/SegmentTab";
import queryString from "query-string";
import notification from "service/api/notification";

const Announcement = ({ setTotalAnnounce }) => {
  const [segment, setSegment] = useState("all");
  const [announce, setAnnounce] = useState([]);
  const fetchAnnouncements = () => {
    const query = queryString.stringify({
      page: 1,
      count: 5,
      type: "announcement",
      segment,
      status: "unread",
    });
    notification
      .get(query)
      .then((res) => {
        setAnnounce(res.data.data.notifications);
        setTotalAnnounce(res.data.data?.total_notify);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [segment]);
  const readNotifHandler = async (id) => {
    try {
      await notification.markAsReadNotification(id);
      const query = queryString.stringify({
        page: 1,
        count: 5,
        type: "announcement",
        segment,
        status: "unread",
      });
      notification
        .get(query)
        .then((res) => {
          setAnnounce(res.data.data.notifications);
          setTotalAnnounce(res.data.data?.total_notify);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <SegmentTab
          segmentArray={[
            { title: "همه اعلانات", id: "all" },
            { title: "هشدارها", id: "alert" },
            { title: "بولتن‌ها", id: "bulletin" },
          ]}
          activeTab={segment}
          onChange={setSegment}
        />
      </div>
      <div className="divide-y-2">
        {announce.length ? (
          announce.map(({ title, created_at, unread, link, id, segment }) => (
            <AnnouncementCard
              key={id}
              type={segment}
              date={created_at}
              title={title}
              description={title}
              read={!unread}
              link={link}
              id={id}
              readNotifHandler={() => readNotifHandler(id)}
            />
          ))
        ) : (
          <div className="h-full flex items-center justify-center font-subtitle-medium mt-10">
            اعلانی برای نمایش وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
