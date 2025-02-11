'use client';;
import { use } from "react";

import { queryService } from '@/api';
import { Breadcrumb, Editor } from '@/components';
import { CommentsList, SubmitComment } from '@/components/feedback';
import { ModelType } from '@/constants';
import { useCurrentScope } from '@/hooks';
import { createFileUrl, formatDateTime } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import NewsList from './NewsList';

export default function NewsPostPage(props: PageProps<'scopeId' | 'postId'>) {
  const params = use(props.params);
  const scope = useCurrentScope();
  const news = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts/{postId}', {
      params: { path: { scopeId: params.scopeId, postId: params.postId } },
    })
  ).data;

  const relatedService = queryService('news:/v1/scope/{scopeId}/posts', {
    params: { path: { scopeId: params.scopeId }, query: { searchDTO: {}, pageable: { size: 4 } /* tags: {} */ } },
  });

  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* news path */}
      <Breadcrumb params={params} items={[{ text: 'اخبار', url: './' }, { text: news.title! }]} />
      <div className="text-black flex gap-8">
        <main className="flex flex-col w-3/4 gap-8 mb-10">
          <img src={createFileUrl(news.coverImage, news.fileKey)} className="w-full rounded-md" alt="" />

          {/* نویسنده خبر */}
          <div className="w-full flex justify-between">
            <h5>نویسنده خبر</h5>
            <span>{formatDateTime(news.createdAt!)}</span>
          </div>

          {/* جزئیات خبر */}
          <div className="">
            <h1 className="text-4xl font-bold mb-8">{news.title}</h1>
            <Editor readonly data={news.content} uploadData={{ fileKey: news.fileKey }} />
          </div>
          <SubmitComment scopeId={params.scopeId} modelTypeId={ModelType.NEWS} modelId={params.postId} />
          <CommentsList modelTypeId={ModelType.NEWS} modelId={params.postId} />
        </main>

        {/* بخش کناری که اخبار منتخب رو به صورت لیستی نشون میده */}
        <aside className="flex flex-col gap-4 flex-5 w-1/4">
          <NewsList title="اخبار منتخب" service={relatedService} />
          {/* <NewsList title="انتخاب سردبیر" service={null} /> */}
        </aside>
      </div>
    </div>
  );
}
