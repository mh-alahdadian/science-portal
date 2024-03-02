'use client';

import { BoundingBox, CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';

const scopeArticlesData = {
  scope: { id: 1, title: 'my scope' },
  articles: [
    { id: 1, title: 'Article Title 1' },
    { id: 2, title: 'Article Title 2' },
    { id: 3, title: 'Article Title 3' },
    { id: 4, title: 'Article Title 4' },
  ],
};

export default function Articles() {
  const data = [scopeArticlesData, scopeArticlesData, scopeArticlesData, scopeArticlesData];
  return (
    <div className="grid grid-cols-2 gap-6">
      {data.map((d, index) => (
        <div className="card card-body gap-10" key={index}>
          <div className="flex items-center">
            <BoundingBox />
            {d.scope.title}
            <Link href={`/scope/${d.scope.id}/articles`} className="btn ms-auto">
              نمایش همه
              <CaretLeft />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {d.articles.map((article) => (
              <Link
                className="flex justify-between"
                href={`/scope/${d.scope.id}/article/${article.id}`}
                key={article.id}
              >
                {article.title}
                <CaretLeft />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
