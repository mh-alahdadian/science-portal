import { useState } from 'react';
import userImg from '../assets/9aa7bd93d2afe99fee333730502d1ac8.png';
import { Cake, ClockUser, CalendarDots, PencilSimple } from '@phosphor-icons/react';

import UserProfile from './UserProfile';
import UserSave from './UserSave';
import UserActivity from './UserActivity';

export default function UserOverView() {
  // State to manage the currently selected component
  const [selectedComponent, setSelectedComponent] = useState('profile');

  // Function to handle button clicks
  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  // Render the selected component dynamically
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'UserSave':
        return <UserSave />;

      case 'UserProfile':
        return <UserProfile />;
      case 'UserActivity':
        return <UserActivity />;
    }
  };

  return (
    <div className="mr-36 w-full border-l border-b border-gray-300 pt-6 pb-2">
      <div className="w-10/12 mx-auto flex flex-col gap-x-4">
        <div className="flex w-full justify-between">
          <div className="flex gap-x-3">
            <img className="max-w-36" src={userImg} alt="x" />
            <div className="flex flex-col gap-y-3">
              <span className="text-4xl leading-9 font-normal">DSCLANDESTINE</span>
              <div className="flex gap-x-3">
                <span className="flex gap-x-1 items-center text-xs leading-4 font-semibold text-blockTextGray">
                  <Cake size={17} />
                  عضویت 11 ماهه
                </span>
                <span className="flex gap-x-1 items-center text-xs leading-4 font-semibold text-blockTextGray">
                  <ClockUser size={17} />
                  آخرین بازید در هفته گذشته
                </span>
                <span className="flex gap-x-1 items-center text-xs leading-4 font-semibold text-blockTextGray">
                  <CalendarDots size={17} />7 روز بازدید
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="gap-x-1 leading-3 text-xs flex w-fit h-fit text-gray-900 bg-white border border-gray-300 hover:bg-blockUserBtnHover focus:bg-blockUserBtnActive font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
            >
              <PencilSimple size={16} />
              ویرایش پروفایل
            </button>
            <button
              type="button"
              className="gap-x-1 leading-3 text-xs flex w-fit h-fit text-gray-900 bg-white border border-gray-300 hover:bg-blockUserBtnHover focus:bg-blockUserBtnActive font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
            >
              <svg
                aria-hidden="true"
                className="native mln2 mr2 svg-icon iconSEXxs"
                width="16"
                height="16"
                viewBox="0 0 18 18"
              >
                <path fill="#8FD8F7" d="M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"></path>
                <path fill="#155397" d="M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2"></path>
                <path fill="#46A2D9" d="M3 5h12v2H3z"></path>
                <path fill="#2D6DB5" d="M3 8h12v2H3z"></path>
              </svg>
              پروفایل شبکه
            </button>
          </div>
        </div>
        <div className="flex mt-10 gap-x-2">
          <button
            onClick={() => handleButtonClick('UserProfile')}
            className={`px-5 py-2 rounded-3xl hover:bg-blockUserBtnHover focus:bg-blockUserBtnBg text-xs leading-4 ${
              selectedComponent === 'UserProfile' ? 'bg-blockUserBtnBg text-white' : 'bg-white text-blockUserBtnText'
            }`}
          >
            پروفایل
          </button>
          <button
            onClick={() => handleButtonClick('UserActivity')}
            className={`px-5 py-2 rounded-3xl hover:bg-blockUserBtnHover focus:bg-blockUserBtnBg text-xs leading-4 ${
              selectedComponent === 'UserActivity' ? 'bg-blockUserBtnBg text-white' : 'bg-white text-blockUserBtnText'
            }`}
          >
            فعالیت
          </button>
          <button
            onClick={() => handleButtonClick('UserSave')}
            className={`px-5 py-2 rounded-3xl hover:bg-blockUserBtnHover focus:bg-blockUserBtnBg text-xs leading-4 ${
              selectedComponent === 'UserSave' ? 'bg-blockUserBtnBg text-white' : 'bg-white text-blockUserBtnText'
            }`}
          >
            ذخیره شده
          </button>
          <button
            onClick={() => handleButtonClick('settings')}
            className={`px-5 py-2 rounded-3xl hover:bg-blockUserBtnHover focus:bg-blockUserBtnBg text-xs leading-4 ${
              selectedComponent === 'settings' ? 'bg-blockUserBtnBg text-white' : 'bg-white text-blockUserBtnText'
            }`}
          >
            تنظیمات
          </button>
        </div>
        {/* Render the selected component */}
        <div className="mt-6">{renderComponent()}</div>
      </div>
    </div>
  );
}
