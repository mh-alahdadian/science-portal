'use client';

import { useCurrentScope } from "@/hooks";
import NewsList from "./NewsList";
import NewsComments from "./NewsComments";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryService } from "@/api";

export default function News({ params }: PageProps<'scopeId' | 'id'>) {
  const scope = useCurrentScope()
  const news = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts/{postId}', { params: { path: {scopeId: params.scopeId, postId: params.id} } }),
  ).data;


  console.log(scope)
console.log(news)

const date = news.createAt.slice(0,10).split("-").join("/")
const time = news.createAt.slice(11,19)


  return (
    <div className="max-w-7xl mx-auto">
      {/* news path */}
      <div className="flex gap-1 items-center text-gray-500 my-4">
        <span>حوزه های {scope?.title}</span> <CaretLeft /> <span>اخبار</span> <CaretLeft /> <span className="text-black">{news?.title}</span>
      </div>
      <div className="bg-gray-100 text-black flex gap-8">
        <main className="flex flex-col w-3/4 mb-10 ">
          <img src={news.coverImage} className="w-full rounded-md" />

          {/* نویسنده خبر */}
          <div className="w-full flex justify-between mt-6">
            <h5>نویسنده خبر</h5>
            <span>{time} - {date}</span>
          </div>

          {/* جزئیات خبر */}
          <div className="mt-8">
            <h1 className="text-4xl font-bold mb-8">{news.title}</h1>
            <p>
              {news.content}
            </p>
          </div>

          {/* دیدگاه من */}
          <div className="p-6 rounded-lg bg-white mt-10 flex flex-col">
            <h5 className="font-bold text-xl">دیدگاه من:</h5>
            <textarea placeholder="نوشتن دیدگاه" className="rounded-lg w-full min-h-32 mt-6 bg-gray-100 resize-none p-4"></textarea>
            <button className="btn btn-primary w-52 text-white mt-6 left-0 self-end">
              ثبت دیدگاه
            </button>
          </div>

          {/* comments */}
          <NewsComments items={[
            {
              userName: "علی",
              userImg: "/userImage.png",
              date: "1402/11/21",
              time: "11:26",
              content: "یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.",
              likes: 47
            },
            {
              userName: "علی",
              userImg: "/userImage.png",
              date: "1402/11/21",
              time: "11:26",
              content: "یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.",
              likes: 47
            }
          ]} />


        </main>

        {/* بخش کناری که اخبار منتخب رو به صورت لیستی نشون میده */}
        <aside className="flex flex-col gap-4 flex-5 w-1/4">
          <NewsList title="اخبار منتخب" items={[
            {
              image: "/singleNewsCover.png",
              title: "عنوان خبر که می‌تواند به اندازه خوبی طولانی باشد. عنوان خبر که می‌تواند به اندازه خوبی طولانی باشد"
            },
            {
              image: "/singleNewsCover.png",
              title: "hiiii"
            },
            {
              image: "/singleNewsCover.png",
              title: "hiiii"
            }
          ]} />

          <NewsList title="انتخاب سردبیر" items={[
            {
              image: "/singleNewsCover.png",
              title: "hiiii"
            }
          ]} />
        </aside>
      </div>
    </div>
  );
}
