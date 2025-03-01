import {
  Alarm,
  Compass,
  Graph,
  HeadCircuit,
  ListMagnifyingGlass,
  Newspaper,
  NewspaperClipping,
  Scales,
  SignOut,
  Sliders,
  TrendUp,
  UserSwitch,
} from '@phosphor-icons/react';
import LogoImg from 'assets/images/logo.png';
import LogoSmallImg from 'assets/images/logo_small.png';
import AuthContext from 'context/auth-context.jsx';
import { useLayoutContext } from 'context/layout-context.jsx';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { SidebarMenuItem } from './SidebarMenuItem.jsx';

export const Sidebar = () => {
  const { isSidebarOpened } = useLayoutContext();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const sidebarItems = [
    { id: 0, title: 'در یک نگاه', path: '/app/dashboard', icon: Compass },
    {
      id: 1,
      title: 'جست‌وجوی پیشرفته',
      path: '/app/advanced-search',
      icon: ListMagnifyingGlass,
    },
    { id: 2, title: 'هشدار', path: '/app/alert', icon: Alarm },
    { id: 3, title: 'بولتن', path: '/app/bulletin', icon: NewspaperClipping },
    { id: 4, title: 'مقایسه', path: '/app/compare', icon: Scales },
    { id: 5, title: 'گزارش ۳۶۰', path: '/app/report-360', icon: UserSwitch },
    { id: 6, title: 'موج‌شناسی', path: '/app/wave-analysis', icon: TrendUp },
    { id: 7, title: 'افکارسنجی', path: '#', icon: HeadCircuit, disabled: true },
    { id: 8, title: 'شناسایی روابط', path: '#', icon: Graph, disabled: true },
    { id: 9, title: 'پیشخوان', path: '/app/newspaper', icon: Newspaper },
    { id: 10, title: 'فیلتر', path: '/app/filter', icon: Sliders },
    { id: 11, title: 'خروج', path: '/app/filter', icon: SignOut },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const foundItem = sidebarItems.find((item) => currentPath.includes(item.path.split('/').pop()));
    setActiveItem(foundItem ? foundItem.title : 'در یک نگاه');
  }, [location.pathname]);

  const handleItemClick = (title) => {
    setActiveItem(title);
  };

  return (
    <div
      className={`min-h-screen sticky top-0 right-0 flex flex-col text-center transition-all duration-200 ${
        isSidebarOpened ? 'w-[225px]' : 'w-[65px]'
      } drop-shadow-sm ${
        isSidebarOpened ? 'p-[16px]' : 'p-[10px]'
      } bg-light-neutral-surface-card relative [direction:ltr] ${isSidebarOpened ? 'items-end' : 'items-center'}`}
      id="sidebar"
    >
      <div
        className={`items-center gap-[8px] flex-[0_0_auto] relative ${
          isSidebarOpened ? 'w-full flex self-stretch justify-start' : 'inline-flex'
        } `}
      >
        <Link to={'/app/dashboard'} className={`w-full h-[40px] relative text-center`}>
          {isSidebarOpened ? (
            <div className="h-full justify-center flex flex-row-reverse items-center gap-2">
              <img className={'h-[40px]'} src={LogoImg} alt="Logo" />
            </div>
          ) : (
            <div className="flex h-full items-center">
              <img className={'h-8'} src={LogoSmallImg} alt="Logo" />
            </div>
          )}
        </Link>
      </div>
      <div
        className={`flex-grow flex flex-col items-end gap-4 mt-[24px] flex-[0_0_auto] relative ${
          isSidebarOpened ? 'w-full' : ''
        } ${!isSidebarOpened ? 'inline-flex' : 'flex'} ${isSidebarOpened ? 'self-stretch' : ''}`}
      >
        {sidebarItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            title={item.title}
            isActive={
              activeItem === item.title &&
              !location?.pathname.startsWith('/app/ticket') &&
              !location?.pathname.startsWith('/app/bookmarks') &&
              !location?.pathname.startsWith('/app/notif/Announcement') &&
              !location?.pathname.startsWith('/app/notif/Notifications') &&
              !location?.pathname.startsWith('/app/notes')
            }
            icon={item.icon}
            path={item.path}
            isSidebarOpen={isSidebarOpened}
            disabled={item.disabled}
            onClick={() => {
              if (item?.title === 'خروج') {
                logout();
              } else {
                handleItemClick(item.title);
              }
            }}
          />
        ))}
        {/* {isSidebarOpened && (
          <div className="w-full" onClick={() => logout()}>
            <SidebarMenuItem title={"خروج"} icon={SignOut} />
          </div>
        )} */}
      </div>
      {/* <div className="w-full mt-auto">
        <SidebarMenuItem
          title={"پشتیبانی"}
          isActive={activeItem === "پشتیبانی"}
          icon={Headset}
          path={`/app/ticket/list`}
          isSidebarOpen={isSidebarOpened}
          onClick={() => handleItemClick("پشتیبانی")}
        />
      </div> */}
    </div>
  );
};
