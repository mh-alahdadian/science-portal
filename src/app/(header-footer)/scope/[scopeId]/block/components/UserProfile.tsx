export default function UserProfile() {
  return (
    <div className="mt-10 flex gap-x-11 mb-10">
      <div className="flex flex-col">
        <span className="text-xl leading-7 mb-3">آمار</span>
        <div className="grid grid-cols-2 w-56 bg-white relative text-right  p-3 rounded-md flex-col border-2 border-blockTagsBorder gap-4">
          <div className="flex flex-col text-xs leading-4">
            <span className="text-lg leading-5">1</span>
            <span className="text-blockTextGray">شهرت</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-5">1</span>
            <span className="text-blockTextGray">رسیده</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-5">1</span>
            <span className="text-blockTextGray">پاسخ ها</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-5">1</span>
            <span className="text-blockTextGray">سوالات</span>
          </div>
        </div>
        <div className="flex mt-10 justify-between mb-3 ">
          <span className="text-xl leading-7">جوامع</span>
          <button className="text-xs leading-4 text-blockTextGray hover:text-blockBtn">ویرایش</button>
        </div>
        <div className="flex w-56 bg-white justify-between text-right  p-3 rounded-md  border-2 border-blockTagsBorder gap-4">
          <span className="text-xs leading-4">کاگنتیو</span>
          <span className="text-xs leading-4">1</span>
        </div>
      </div>
      <div className=" flex flex-col gap-y-5">
        <span className="text-xl leading-7">درباره</span>
        <div className="h-24 min-w-2xl flex items-center justify-center bg-blockUserBtnHover rounded-md flex-col border-2 border-blockTagsBorder">
          <p className=" w-1/2 mx-auto text-xs leading-4 text-gray">
            بخش درباره من شما در حال حاضر خالی است. آیا می خواهید یکی را اضافه کنید؟
            <a className="underline" href="">
              ویرایش نمایه
            </a>
          </p>
        </div>
        <span className="text-xl leading-7">مدال ها</span>
        <div className="h-24 min-w-2xl flex items-center justify-center bg-blockUserBtnHover rounded-md flex-col border-2 border-blockTagsBorder">
          <p className=" w-1/2 mx-auto text-xs leading-4 text-gray">
            شما هیچ{' '}
            <a className="text-blockTagsLink text-xs leading-4 no-underline mt-5" href="">
              مدالی
            </a>{' '}
            کسب نکرده اید.
          </p>
        </div>
        <span className="text-xl leading-7">پست ها</span>
        <div className="min-h-96 min-w-2xl flex items-center justify-center bg-blockUserBtnHover rounded-md flex-col border-2 border-blockTagsBorder">
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
          <p className=" w-1/2 mx-auto text-xs leading-4 text-gray">
            تازه شروع شده؟ سعی کنید به یک سوال پاسخ دهید! مفیدترین سوالات، پاسخ ها و برچسب های شما در اینجا ظاهر می
            شوند.
            <a className="text-blockTagsLink text-xs leading-4 no-underline mt-5" href="">
              با پاسخ دادن به یک سوال
            </a>
            یا انتخاب برچسب هایی که با موضوعات مورد علاقه شما مطابقت دارند شروع کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
