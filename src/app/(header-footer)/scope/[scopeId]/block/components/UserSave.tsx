import { Plus } from '@phosphor-icons/react';

export default function UserSave() {
  return (
    <div className="mt-10 w-full flex justify-between gap-x-10 mb-10">
      <div className="w-4/12 max-w-64 flex justify-between h-fit flex-col gap-y-4">
        <button className="text-right p-2 rounded-3xl hover:bg-blockUserBtnHover text-xs leading-4 bg-white text-blockUserBtnText focus:bg-blockUserBtnBg focus:text-white">
          تمامی ذخیره شده ها
        </button>
        <button className="text-right px-5 py-2 rounded-3xl hover:bg-blockUserBtnHover text-xs leading-3 bg-white text-blockUserBtnText focus:bg-blockUserBtnBg focus:text-white">
          برای بعدا
        </button>
        <div className=" max-w-64 flex justify-between h-fit">
          <span className="text-xs leading-4 font-bold">لیست های من</span>
          <button className=" text-xs leading-4 font-bold">
            <Plus className="text-blockTagsLink" size={20} />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl leading-7">تمامی ذخیره شده ها</span>
            <span className="text-xl leading-6">
              <span>(0)</span>
              موارد ذخیره شده
            </span>
          </div>
          <button
            type="button"
            className="h-fit rounded-lg p-3 text-white bg-blockBtn hover:bg-blockBtnHover hover:to-blockBtnTextHover active:bg-blockBtnAct"
          >
            <span className="text-xs  leading-4">ساخت لیست جدید</span>
          </button>
        </div>
        <div className="w-8/12 mx-auto">
          <div className="min-h-96 min-w-2xl flex items-center justify-center rounded-md flex-col">
            <svg aria-hidden="true" className="mb-10" width="196" height="196" viewBox="0 0 196 196">
              <path
                d="M35 177.5c-19.5-9-29.35-26.54-26-82s14.8-66.9 32.5-73S127.72.55 161.5 28s37.46 52.67 23 96.5c-14.46 43.84-22.26 63.24-60 61-11.4-.68-22.3-.85-32.5-1.02-23.56-.38-43.4-.7-57-6.98M33 42v26a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V42a7 7 0 0 0-7-7H40a7 7 0 0 0-7 7m7 39a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7z"
                opacity=".07"
              ></path>
              <path
                d="M42 48a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v23a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7zm0 47a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v22a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7zm-1 36h3.19a2 2 0 1 1 0 4H40a3 3 0 0 0-3 3v4.44a2 2 0 1 1-4 0V138a7 7 0 0 1 7-7zm11.65 2c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2m18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h4.2a7 7 0 0 1 7 7v4.44a2 2 0 1 1-4 0v-4.58a3 3 0 0 0-3-2.86h-4.19a2 2 0 0 1-2-2M35 151.56a2 2 0 0 1 2 2v4.51a3 3 0 0 0 3 2.93h4.19a2 2 0 1 1 0 4h-4.35a7 7 0 0 1-6.84-7v-4.44c0-1.1.9-2 2-2m123 0a2 2 0 0 1 2 2v4.75a7 7 0 0 1-7 6.69h-4.19a2 2 0 1 1 0-4h4.33a3 3 0 0 0 2.86-3v-4.44c0-1.1.9-2 2-2M52.65 163c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2m18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2m18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2"
                opacity=".2"
              ></path>
              <path d="M124.49 14.24 120.24 10 116 14.24l4.24 4.25zM52 58a4 4 0 1 0 0-8 4 4 0 0 0 0 8m12-4c0-1.1.9-2 2-2h80a2 2 0 1 1 0 4H66a2 2 0 0 1-2-2M33 42a7 7 0 0 1 7-7h113a7 7 0 0 1 7 7v26a7 7 0 0 1-7 7H40a7 7 0 0 1-7-7zm7-3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h113a3 3 0 0 0 3-3V42a3 3 0 0 0-3-3zm16 62a4 4 0 1 1-8 0 4 4 0 0 1 8 0m10-2a2 2 0 1 0 0 4h80a2 2 0 1 0 0-4zM40 81a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7zm-3 7a3 3 0 0 1 3-3h113a3 3 0 0 1 3 3v27a3 3 0 0 1-3 3H40a3 3 0 0 1-3-3zm150.97 54.49L179.5 134l-8.49 8.49 8.49 8.48zm-8.48 2.82-2.83-2.82 2.83-2.83 2.82 2.83zM8 97a2 2 0 0 1 2 2v4h4a2 2 0 1 1 0 4h-4v4a2 2 0 1 1-4 0v-4H2a2 2 0 1 1 0-4h4v-4c0-1.1.9-2 2-2"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
