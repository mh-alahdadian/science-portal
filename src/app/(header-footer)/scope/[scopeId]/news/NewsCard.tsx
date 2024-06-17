'use client';

import { queryService } from "@/api";
import { useCurrentScope } from "@/hooks";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";

import {newsSingleCard, newsSingleItem} from "src/types/news";

export default function NewsCard(props: Schema<"PostDTO">) {
  const scope = useCurrentScope()

  const dateTemp:string = new Date(props.createAt!).toLocaleString('fa-IR');
  const date:string = dateTemp?.slice(0, 10).split("-").join("/")
  const time: string = dateTemp?.slice(11, 19)


  return (
    <div className="p-6 rounded-lg flex flex-col shadow-md gap-4">
      <img src={props.coverImage} className="w-full max-h-[273px] rounded-md"/>

      <h4 className="font-bold line-clamp-2">{props.title}</h4>
      <div className="flex justify-between opacity-75">
        <span className="text-sm">{props.userId? props.userId : "نویسنده نامعلوم"}</span>
        <span className="text-sm">{date} - {time}</span>
      </div>
    </div>
  );
}
