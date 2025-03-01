import { Bell, CaretLeft, Megaphone } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { CTabs } from "../ui/CTabs";
import Announcement from "./Announcement";
import Notifications from "./Notifications";
import { useRouter } from 'next/navigation';
import notification from "../../service/api/notification";
import { useLayoutContext } from "../../context/layout-context";

const NotificationsInDrawer = () => {
  const { setOpenDrawer } = useLayoutContext();
  const [activeTab, setActiveTab] = useState("Announcement");
  const [totalNotif, setTotalNotif] = useState(0);
  const [totalAnnounce, setTotalAnnounce] = useState(0);
  const router = useRouter()
  useEffect(() => {
    notification
      .statistical()
      .then((res) => {
        setTotalAnnounce(res.data.data.unread_announcement);
        setTotalNotif(res.data.data.unread_notification);
      })
      .catch((err) => console.log(err));
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        {/* <div>
        <X color="#00000080" size={24} />
      </div> */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-headline-medium">
            {activeTab === "Notifications" ? "اطلاعیه‌ها" : "اعلانات"}
          </span>
          <div
            className="flex gap-2 font-button-medium text-light-primary-text-rest cursor-pointer"
            onClick={() => {
              router.push(`/app/notif/${activeTab}`);
              setOpenDrawer(false);
            }}
          >
            <span>نمایش همه</span>
            <CaretLeft />
          </div>
        </div>
        <div>
          <CTabs
            hasIcon={true}
            iconSize={24}
            tabArray={[
              {
                id: "Announcement",
                title: "اعلانات",
                icon: Megaphone,
                count: totalAnnounce,
              },
              {
                id: "Notifications",
                title: "اطلاعیه‌ها",
                icon: Bell,
                count: totalNotif,
              },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
      {activeTab === "Notifications" ? (
        <Notifications setTotalNotif={setTotalNotif} />
      ) : (
        <Announcement setTotalAnnounce={setTotalAnnounce} />
      )}
    </div>
  );
};

export default NotificationsInDrawer;
