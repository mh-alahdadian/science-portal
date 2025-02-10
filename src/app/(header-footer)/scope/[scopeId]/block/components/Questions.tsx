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
import CommentCart from './CommentCart';

const questionsData = [
    {
        id: 1,
        voteCount: 1,
        replyCount: 4,
        viewCount: 33,
        date: "۱۴۰۳/۱۱/۲۱",
        fields: [
            {
                id: 1,
                title: 'پایتون',
            },
            {
                id: 2,
                title: 'آژور',
            }
        ],
        title: "Can't add libraries to function_app.py in azure Function",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, eum.'
    },
    {
        id: 2,
        voteCount: 6,
        replyCount: 12,
        viewCount: 30,
        date: "۱۴۰۳/۱۱/۲۱",
        fields: [
            {
                id: 1,
                title: 'پایتون',
            },
            {
                id: 2,
                title: 'آژور',
            }
        ],
        title: "Can't add libraries to function_app.py in azure Function",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, eum.'
    }
]

export default function Questions() {
    return (
        <div className="h-screen overflow-auto min-w-[768px] flex flex-col   border-l border-b border-gray-300 pt-6 pb-2">
            <div className="flex w-full justify-between items-center mb-3 px-2">
                <span className=" text-2xl leading-9"> جدیدترین سوالات</span>
                <button
                    type="button"
                    className=" p-3 text-white bg-blockBtn hover:bg-blockBtnHover hover:to-blockBtnTextHover active:bg-blockBtnAct"
                >
                    <span className="text-xs leading-4">پرسیدن سوال</span>
                </button>
            </div>
            <div className="flex w-full justify-between items-center border-gray-300 px-2">
                <div className="flex text-lg leading-6 px-2">۲۴,۲۴۷,۶۸۳ سوالات</div>
                <div className="flex items-center mb-3">
                    <div className="flex gap-x-2 border border-gray-300 p-1 rounded-md">
                        <button className="border-none hover:border-black bg-white hover:bg-blockFilterBtn font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-1 !text-[14px]">
                            جدیدترین
                        </button>
                        <button className="border-none hover:border-black bg-white hover:bg-blockFilterBtn font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-1 !text-[14px]">
                            فعال
                        </button>
                        <button className="border-none hover:border-black bg-white hover:bg-blockFilterBtn font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-1 !text-[14px]">
                            جایزه دار
                            <span className="flex items-center text-white px-2 py-1 bg-blockBtn rounded-md ">۸۳</span>
                        </button>
                        <button className="border-none hover:border-black bg-white hover:bg-blockFilterBtn font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-1 !text-[14px]">
                            بی پاسخ
                        </button>
                        <button className="border-none hover:border-black bg-white hover:bg-blockFilterBtn font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-1 !text-[14px]">
                            بیشتر
                            <CaretDown size={18} />
                        </button>
                    </div>
                    <button className="mr-3 border-blockBtn text-blue-500  bg-white hover:bg-blockFilterBtnHover font-normal active:text-blockFilterBtnTextAct active:font-bold max-h-min px-2 py-4 !text-[14px]">
                        فیلتر
                        <FunnelSimple size={18} />
                    </button>
                </div>
            </div>
            <div className="flex w-full border-t">
                <div className="w-full">

                    {questionsData && questionsData.map((item, index) => <CommentCart className={`${index % 2 === 0 ? "bg-blockBcQ1" : "bg-white"}`} title={item.title} description={item.description} fields={item.fields} replyCount={item.replyCount} voteCount={item.voteCount} viewCount={item.viewCount} date={item.date} />)}
                    <div className="flex min-w-full gap-x-5 px-2 py-4 bg-blockBcQ1 border-y">
                        <div className="flex flex-col pr-10 gap-y-2">
                            <span>-۱ رای</span>
                            <span className="flex items-center gap-x-1 px-2 py-1 rounded-md bg-blockAnswers text-white">
                                ۲ پاسخ
                                <Check size={18} />
                            </span>
                            <span className="text-blockBtn">۱۵۴ بازدید</span>
                            <span className="flex items-center w-fit px-2 py-1 rounded-md text-white bg-blockBtn">
                                ۴۰۰
                                <Plus size={18} />
                            </span>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col">
                                <h2 className="text-lg text-blockTitle">Can't add libraries to function_app.py in azure Function</h2>
                                <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, eum.</p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-x-3">
                                    <button className="border-none hover:border-black bg-blockFilterBtnText hover:bg-blockFilterBtn  active:text-blockFilterBtnTextAct font-bold max-h-min px-2 py-1 !text-[12px]">
                                        پایتون
                                    </button>
                                    <button className="border-none hover:border-black bg-blockFilterBtnText hover:bg-blockFilterBtn  active:text-blockFilterBtnTextAct font-bold max-h-min px-2 py-1 !text-[12px]">
                                        آزور
                                    </button>
                                </div>
                                <div className="flex gap-x-2 text-xs text-gray-500">
                                    <span>پرسیده شده در تاریخ:</span>
                                    <span>۱۴۰۳/۱۱/۲۱</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}