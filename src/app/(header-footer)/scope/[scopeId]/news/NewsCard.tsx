'use client';

import { queryService } from "@/api";
import { useCurrentScope } from "@/hooks";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";

import {newsSingleCard, newsSingleItem} from "src/types/news";


export default function NewsCard(props: newsSingleItem) {
  const scope = useCurrentScope()

  // const users = useSuspenseQuery(
  //   queryService("core:/v1/manager/{page}/users/{userId}", {
  //     params: {
  //       path: {page: `${props.createAt ? props.createAt : "0"}`, userId: props.userId }
  //     }
  //   })
  // )
  console.log(props)

  const date:string = props.createAt?.slice(0, 10).split("-").join("/")
  const time: string = props.createAt?.slice(11, 19)


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
