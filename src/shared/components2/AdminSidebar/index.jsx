import { useContext, useState, useEffect } from "react";
import {
  Alarm,
  NewspaperClipping,
  Compass,
  ListMagnifyingGlass,
  Sliders,
  SignOut,
  TrendUp,
  Graph,
  UserSwitch,
  HeadCircuit,
  Scales,
  Newspaper,
  Headset,
  UserCircle,
  Notebook,
  SquaresFour,
  UserList,
  BellSimple,
  PresentationChart,
  Exclude,
  Target,
} from "@phosphor-icons/react";
import { useLayoutContext } from "context/layout-context.jsx";
import { SidebarMenuItem } from "./SidebarMenuItem.jsx";
import LogoImg from "../../assets/images/logo.png";
import AuthContext from "../../context/auth-context.jsx";
import {Link} from 'next/link'

export const AdminSidebar = () => {
  const { isSidebarOpened } = useLayoutContext();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  const sidebarItems = [
    { id: 0, title: "داشبورد", path: "/admin/dashboard", icon: SquaresFour },
    { id: 1, title: "کاربران", path: "/admin/user", icon: UserList },
    { id: 2, title: "تیکت‌ها", path: "/admin/ticket", icon: Headset },
    {
      id: 3,
      title: "اطلاعیه‌ها",
      path: "/admin/announcement-management",
      icon: BellSimple,
    },
    {
      id: 4,
      title: "گزارشات مدیریتی",
      path: "/admin/management-reports",
      icon: PresentationChart,
    },
    { id: 5, title: "هشدار", path: "/admin/warning", icon: Alarm },
    { id: 6, title: "فیلترها", path: "/admin/filters", icon: Sliders },
    { id: 7, title: "بولتن", path: "/admin/bulletin", icon: NewspaperClipping },
    { id: 8, title: "مقایسه", path: "/admin/compare", icon: Exclude },
    { id: 9, title: "گزارش ۳۶۰", path: "/admin/360-report", icon: Target },
    { id: 10, title: "پیشخوان", path: "/admin/kiosk", icon: Newspaper },
    // { title: "مدیریت کاربران", path: "/admin/user", icon: UserCircle },
    // { title: "مدیریت تیکت‌ها", path: "/admin/ticket", icon: Headset },
    // {
    //   title: "مدیریت اطلاعیه‌ها",
    //   path: "/admin/announcement-management",
    //   icon: Alarm,
    // },
    // { title: "گزارشات مدیریتی", path: "#", icon: Notebook, disabled: true },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const foundItem = sidebarItems.find((item) =>
      currentPath.includes(item.path.split("/").pop()),
    );
    setActiveItem(foundItem ? foundItem.title : "در یک نگاه");
  }, [location.pathname]);

  const handleItemClick = (title) => {
    setActiveItem(title);
  };

  return (
    <div
      className={`min-h-screen sticky top-0 right-0 flex flex-col text-center transition-all duration-200 ${
        isSidebarOpened ? "w-[225px]" : "w-[65px]"
      } drop-shadow-sm ${
        isSidebarOpened ? "p-[16px]" : "p-[10px]"
      } bg-light-neutral-surface-card relative [direction:ltr] ${
        isSidebarOpened ? "items-end" : "items-center"
      }`}
      id="sidebar"
    >
      <div
        className={`items-center gap-[8px] flex-[0_0_auto] relative ${
          isSidebarOpened
            ? "w-full flex self-stretch justify-start"
            : "inline-flex"
        } `}
      >
        <Link
          to={"/admin/dashboard"}
          className={`h-[40px] relative text-center ${
            isSidebarOpened
              ? "w-full"
              : "w-[32px] bg-[url(/logo.svg)] bg-contain bg-no-repeat"
          }`}
        >
          {isSidebarOpened && (
            <div className="h-full justify-center flex flex-row-reverse items-center gap-2">
              <img className={"h-[40px]"} src={LogoImg} alt="Logo" />
            </div>
          )}
        </Link>
      </div>
      <div
        className={`flex-grow flex flex-col items-end gap-2 mt-[24px] flex-[0_0_auto] relative ${
          isSidebarOpened ? "w-full" : ""
        } ${!isSidebarOpened ? "inline-flex" : "flex"} ${
          isSidebarOpened ? "self-stretch" : ""
        }`}
      >
        {sidebarItems.map((item) => (
          <div key={item.id} className={`w-full`}>
            <SidebarMenuItem
              title={item.title}
              isActive={activeItem === item.title}
              icon={item.icon}
              path={item.path}
              isSidebarOpen={isSidebarOpened}
              disabled={item.disabled}
              onClick={() => handleItemClick(item.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
