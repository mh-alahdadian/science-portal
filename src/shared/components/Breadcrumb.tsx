import { useCurrentScope } from '@/hooks';
import clsx from 'clsx';
import Link from 'next/link';

interface Bread {
  text: string;
  url?: string;
}

interface Props {
  className?: string;
  items: Bread[];
  params: { scopeId: number };
}

export function Breadcrumb(props: Props) {
  const scope = useCurrentScope();
  const scopeBreads: Bread[] = [
    { text: 'صفحه اصلی', url: '/' },
    { text: 'حوزه پژوهشی ' + scope.title, url: '/scope/' + props.params.scopeId },
  ];
  const className = 'max-w-sm overflow-hidden text-ellipsis';
  return (
    <nav className={clsx('breadcrumbs', props.className)}>
      <ol>
        {scopeBreads.concat(props.items).map((item, index) => (
          <li key={index}>
            {item.url ? (
              <Link className={className} href={item.url}>
                {item.text}
              </Link>
            ) : (
              <span className={className}>{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
