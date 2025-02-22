'use client';
import { Briefcase, Buildings, Chat, ChatCircleText, House, Palette, Plus, Users } from '@phosphor-icons/react';
import { ComponentName } from '../page'; // Import the shared type

// Define the type for the props
interface RightSideNavProps {
  onNavClick: (componentName: ComponentName) => void;
}

const RightSideNav: React.FC<RightSideNavProps> = ({ onNavClick }) => {
  return (
    <div className="flex flex-col w-64 border-gray-300 bg-[#e7e7e7e7] border-l h-screen overflow-y-auto">
      <ul className="min-w-52 flex flex-col mt-10">
        <li>
          <div
            className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md"
            onClick={() => onNavClick('userOverview')} // Call onNavClick with 'userOverview'
          >
            <House size={24} />
            <span>خانه</span>
          </div>
        </li>
        <li>
          <div
            className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md"
            onClick={() => onNavClick('questions')} // Call onNavClick with 'questions'
          >
            <ChatCircleText size={24} />
            <span>سوالات</span>
          </div>
        </li>
        <li>
          <div
            className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md"
            onClick={() => onNavClick('tags')} // Call onNavClick with 'tags'
          >
            <Palette size={24} />
            <span>تگ ها</span>
          </div>
        </li>
        <li className="mt-9">
          <div
            className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md"
            onClick={() => onNavClick('users')} // Call onNavClick with 'users'
          >
            <Users size={24} />
            <span>کاربران</span>
          </div>
        </li>
        <li>
          <div
            className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md"
            onClick={() => onNavClick('companies')} // Call onNavClick with 'companies'
          >
            <Buildings size={24} />
            <span>شرکت ها</span>
          </div>
        </li>
      </ul>
      <div className="flex flex-col mt-5">
        <ul>
          <li className="mt-6">
            <div className="w-full flex justify-between cursor-pointer hover:bg-gray-200 rounded-r-md items-center">
              <div className="flex w-full p-2 gap-1">
                <Briefcase size={24} />
                <span>مشاغل</span>
              </div>
              <div className="ml-2 px-2 text-gray-500 bg-gray-400 rounded-3xl flex items-center justify-center">
                جدید
              </div>
            </div>
          </li>
          <li>
            <div className="w-full flex p-2 gap-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
              <Chat size={24} />
              <span>مباحث</span>
            </div>
          </li>
        </ul>
        <div className="flex flex-col mt-5">
          <div className="flex flex-col w-full justify-between">
            <div className="group flex w-full justify-between mb-3">
              <span className="text-lg">عمومی</span>
              <Plus size={14} className="text-gray-500 group-hover:text-black ml-4" />
            </div>
            <span className="max-w-28 text-xs">
              مجامع برای تمامی تکنولوژی های مورد علاقه شما
              <a className="text-indigo-600 underline" href="">
                جست و جو در تمامی مجامع
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideNav;
