'use client';

import Article from '@service/journal/(articles)/Article';

const scopeArticlesData: Schema<'ArticleResponseDTO'>[] = [
  { id: 1, title: 'Article Title 1', authorId: 1, authorName: 'فلانی' },
  { id: 2, title: 'Article Title 2', authorId: 2, authorName: 'فلانی' },
  { id: 3, title: 'Article Title 3', authorId: 3, authorName: 'فلانی' },
  { id: 4, title: 'Article Title 4', authorId: 4, authorName: 'فلانی' },
];

export default function Articles() {
  const articles = scopeArticlesData;
  return (
    <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <Article article={article} />
      ))}
    </div>
  );
}
