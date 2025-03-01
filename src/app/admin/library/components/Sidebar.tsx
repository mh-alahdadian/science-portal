import { Books, CaretDown, CaretRight, ChatCircle, House, List, SignOut, User } from '@phosphor-icons/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';

interface SubRoute {
  path: string;
  name: string;
  icon: ReactElement;
}

interface Route {
  name: string;
  icon: ReactElement;
  path?: string; // Optional for parent routes with children
  children?: SubRoute[];
}

const routes: Route[] = [
  // {
  //   name: 'سیستم',
  //   icon: <Books />,
  //   children: [
  //     { path: '/admin/system/users', name: 'مدیریت دسترسی‌ها', icon: <User size={24} weight="regular" /> },
  //     { path: '/admin/system/scopes', name: 'مدیریت حوزه‌ها', icon: <div></div> },
  //   ],
  // },
  {
    name: 'کتابخانه',
    icon: <Books />,
    children: [
      { path: '/admin/library/', name: 'داشبورد', icon: <House size={24} weight="regular" /> },
      { path: '/admin/library/categories', name: 'مدیریت دسته‌ بندی', icon: <User size={24} weight="regular" /> },
      { path: '/admin/library/addBook', name: 'افزودن کتاب', icon: <User size={24} weight="regular" /> },
      { path: '/admin/library/publishers', name: 'مدیریت ناشران', icon: <User size={24} weight="regular" /> },
      { path: '/admin/library/authors', name: 'مدیریت نویسندگان', icon: <User size={24} weight="regular" /> },
      { path: '/admin/library/comments', name: 'مدیریت کامنت‌ها', icon: <ChatCircle size={24} weight="regular" /> },
    ],
  },
];

function NavItemWithSubmenu({
  route,
  isActive,
  isCollapsed,
}: {
  route: Route;
  isActive: (path: string) => boolean;
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const anyChildActive = route.children?.some((child) => isActive(child.path)) || false;

  // Auto-expand submenu if any child is active
  useEffect(() => {
    if (anyChildActive) setIsOpen(true);
  }, [anyChildActive]);

  return (
    <div className={anyChildActive ? 'submenu-active' : ''}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
          anyChildActive ? 'text-blue-400' : 'hover:bg-gray-700'
        }`}
      >
        <div className="flex items-center">
          <span className="mr-3">{route.icon}</span>
          {!isCollapsed && <span>{route.name}</span>}
        </div>
        {!isCollapsed && (isOpen ? <CaretDown size={16} /> : <CaretRight size={16} />)}
      </button>

      {isOpen && (
        <ul className={`mt-1 ml-${isCollapsed ? '0' : '6'} space-y-1`}>
          {route.children?.map((child, childIndex) => (
            <li key={childIndex}>
              <NavItem route={child} isActive={isActive(child.path)} isCollapsed={isCollapsed} isChild={true} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavItem({
  route,
  isActive,
  isCollapsed,
  isChild = false,
}: {
  route: Route | SubRoute;
  isActive: boolean;
  isCollapsed: boolean;
  isChild?: boolean;
}) {
  return (
    <Link
      href={route.path || '#'}
      className={`flex items-center p-3 rounded-md transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
      } ${isChild && !isCollapsed ? 'pl-6 text-sm' : ''}`}
    >
      <span className={`${!isChild ? 'mr-3' : 'mr-2'}`}>{route.icon}</span>
      {!isCollapsed && <span>{route.name}</span>}
    </Link>
  );
}
export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function isActive(path: string) {
    return pathname === path || pathname.startsWith(path + '/');
  }

  return (
    <aside
      className={clsx(
        'fixed right-0 top-0 h-full z-50 flex flex-col gap-16 items-center px-8 py-16 duration-300',
        `transition-all bg-gray-800 text-white h-screen`,
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex justify-between items-center w-full border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold">پنل ادمین</h1>}
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700 transition-colors">
          <List size={24} weight="regular" />
        </button>
      </div>

      <nav className="mt-6 w-full">
        <ul className="space-y-1">
          {routes.map((route, index) => (
            <li key={index}>
              {route.children ? (
                <NavItemWithSubmenu route={route} isActive={isActive} isCollapsed={isCollapsed} />
              ) : (
                <NavItem route={route} isActive={isActive(route.path!)} isCollapsed={isCollapsed} />
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <Link href="/logout" className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors">
          <span className="mr-3">
            <SignOut size={24} weight="regular" />
          </span>
          {!isCollapsed && <span>خروج</span>}
        </Link>
      </div>
    </aside>
  );
}
