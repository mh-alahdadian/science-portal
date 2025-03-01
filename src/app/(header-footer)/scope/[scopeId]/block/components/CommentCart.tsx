import { Check, Plus } from "@phosphor-icons/react";

interface CommentCardProps {
    title: string,
    description: string,
    voteCount: number,
    replyCount: number,
    viewCount: number,
    fields: {id: number, title: string}[],
    date: string,
    className: string

}

export default function CommentCart({ voteCount, replyCount, viewCount, title, description, fields, date, className } : CommentCardProps) {
    return (
        <div className={`flex min-w-full gap-x-5 px-2 py-4 border-y ${className}`}>
            <div className="flex flex-col pr-10 gap-y-2">
                <span>-{voteCount} رای</span>
                <span className="flex items-center gap-x-1 px-2 py-1 rounded-md bg-blockAnswers text-white">
                    {replyCount} پاسخ
                    <Check size={18} />
                </span>
                <span className="text-blockBtn">{viewCount} بازدید</span>
                <span className="flex items-center w-fit px-2 py-1 rounded-md text-white bg-blockBtn">
                    ۴۰۰
                    <Plus size={18} />
                </span>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg text-blockTitle">{title}</h2>
                    <p className="text-xs">{description}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-x-3">
                        {fields && fields.map(item => (
                            <button key={item.id} className="border-none hover:border-black bg-blockFilterBtnText hover:bg-blockFilterBtn  active:text-blockFilterBtnTextAct font-bold max-h-min px-2 py-1 !text-[12px]">
                                {item.title}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-x-2 text-xs text-gray-500">
                        <span>پرسیده شده در تاریخ:</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}