'use client';

import { useCurrentScope } from "@/hooks";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";

import {newsSingleCard} from "src/types/news";


export default function NewsCard(props: newsSingleCard) {
  const scope = useCurrentScope()


  return (
    <div className="p-6 rounded-lg flex flex-col shadow-md gap-4">
      <img src={props.img} className="w-full max-h-[273px] rounded-md"/>

      <h4 className="font-bold line-clamp-2">{props.title}</h4>
      <div className="flex justify-between opacity-75">
        <span className="text-sm">{props.author}</span>
        <span className="text-sm">{props.date} - {props.time}</span>
      </div>
    </div>
  );
}
