import { queryClient, queryService } from '@/api';
import { useProfile } from '@/hooks';
import { ServiceMenu } from './ServiceMenu';

interface Page {
    title: string;
    path: string;
  }
  
  
const services: Page[] = [
    { title: 'اخبار', path: 'news' },
    { title: 'انجمن', path: 'forum' },
    { title: 'کتابخانه', path: 'library' },
    { title: 'وبلاگ', path: 'blog' },
    { title: 'گالری', path: 'gallery' },
  ];
  
  function getParams(scopeId: string) {
    return { params: Number.isInteger(+scopeId) ? { query: { scopeId } } : {} } as any;
  }
  
  const emptyArr: any[] = [];
  
export default async function Services({scopeId}: {scopeId: string}) {
    const servicesItems = await Promise.all([
        queryClient.fetchQuery(queryService('news:/categories/scopes', getParams(scopeId))),
        queryClient.fetchQuery(queryService('forum:/categories/scopes', getParams(scopeId))),
      ]).catch(() => []);
    
      return (
    <>
      {services.map((page, index) => (
        <ServiceMenu key={page.title} path={page.path} title={page.title} items={servicesItems[index] || emptyArr} />
      ))}
    </>
  );
}
