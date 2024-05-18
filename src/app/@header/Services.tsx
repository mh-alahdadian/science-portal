import { queryClient, queryService } from '@/api';
import { ServiceMenu } from './ServiceMenu';

interface Page {
  title: string;
  path: string;
}

const services: Page[] = [
  { title: 'اخبار', path: 'news' },
  { title: 'انجمن', path: 'forum' },
  { title: 'کتابخانه', path: 'library' },
  { title: 'مقالات', path: 'article' },
];

function getParams(scopeId: number) {
  return { params: Number.isInteger(+scopeId) ? { query: { scopeId } } : {} } as any;
}

const emptyArr: any[] = [];

export default async function Services({ scopeId }: { scopeId: number }) {
  const servicesItems = await Promise.all([
    queryClient.fetchQuery(queryService('news:/v1/scope/{scopeId}/categories', getParams(scopeId))),
    queryClient.fetchQuery(queryService('forum:/v1/scope/{scopeId}/categories', getParams(scopeId))),
  ]).catch(() => []);

  return (
    <>
      {services.map((page, index) => (
        <ServiceMenu key={page.title} path={page.path} title={page.title} items={servicesItems[index] || emptyArr} />
      ))}
    </>
  );
}
