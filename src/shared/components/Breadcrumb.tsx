import { useCurrentScope } from '@/hooks';
import Link from 'next/link';
import { Fragment } from 'react';

interface Bread {
  text: string;
  url?: string;
}

interface Props {
  items: Bread[];
  params: { scopeId: number };
}

export function Breadcrumb(props: Props) {
  const scope = useCurrentScope();
  const scopeBreads: Bread[] = [
    { text: 'صفحه اصلی', url: '/' },
    { text: 'حوزه پژوهشی ' + scope.title, url: '/scope/' + props.params.scopeId },
  ];
  return (
    <nav className="breadcrumbs mb-8">
      <ol>
        {scopeBreads.concat(props.items).map((item, index) => (
          <li key={index}>{item.url ? <Link href={item.url}>{item.text}</Link> : <Fragment>{item.text}</Fragment>}</li>
        ))}
      </ol>
    </nav>
  );
}
