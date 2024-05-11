'use client';
import { singleNewsItem } from "src/types/news";

import { useCurrentScope } from "@/hooks";
import { CaretLeft } from "@phosphor-icons/react";

export default function NewsListSingleItem(props: singleNewsItem) {
    const scope = useCurrentScope()


    return (
        <div className="flex flex-row gap-2 w-full items-center mb-0 hover:bg-gray-200 p-2 rounded-md">
            <img src={props.image} className="w-[80px] h-[58px] object-cover rounded-lg" />

            <div className="flex flex-row justify-between w-full h-full">
                <h5 className="m-0 line-clamp-2 text-sm">{props.title}</h5>

                
                <CaretLeft className="shrink-0 self-center" />
            </div>

        </div>
    );
}
