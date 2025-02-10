'use client';
import {
  House,
  ChatCircleText,
  Palette,
  Users,
  Buildings,
  Briefcase,
  Chat,
  Info,
  Plus,
  CaretDown,
  FunnelSimple,
  Check,
} from '@phosphor-icons/react';

export default function RightSideNav() {
  return (
    <div className="flex flex-col border-gray-300 border-l">
      <ul className="min-w-52 flex flex-col gap-y-2 mt-10">
        <li>
          <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
            <House size={18} />
            <span>خانه</span>
          </div>
        </li>
        <li>
          <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
            <ChatCircleText size={18} />
            <span>سوالات</span>
          </div>
        </li>
        <li>
          <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
            <Palette size={18} />
            <span>تگ ها</span>
          </div>
        </li>
        <li className="mt-9">
          <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
            <Users size={18} />
            <span>کاربران</span>
          </div>
        </li>
        <li>
          <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
            <Buildings size={18} />
            <span>شرکت ها</span>
          </div>
        </li>
      </ul>
      <div className="flex flex-col mt-5">
        <div className="group flex w-full justify-between">
          <span className="text-lg">آزمایشگاه ها</span>
          <Info size={14} className="text-gray-500 group-hover:text-black ml-4" />
        </div>
        <ul>
          <li className="mt-6">
            <div className="w-full flex justify-between cursor-pointer hover:bg-gray-200 rounded-r-md items-center">
              <div className="flex w-full p-2 gap-x-1">
                <Briefcase size={18} />
                <span>مشاغل</span>
              </div>
              <div className="ml-2 px-2 text-gray-500 bg-gray-400 rounded-3xl flex items-center justify-center">
                جدید
              </div>
            </div>
          </li>
          <li>
            <div className="w-full flex p-2 gap-x-1 cursor-pointer hover:bg-gray-200 rounded-r-md">
              <Chat size={18} />
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
}