import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  items: { icon?: string; url?: string; text: string }[];
}

export function Breadcrumb(props: Props) {
  return (
    <nav className="breadcrumbs">
      <ol>
        {props.items.map((item, index) => (
          <li key={index}>{item.url ? <Link href="">{item.text}</Link> : <Fragment>{item.text}</Fragment>}</li>
        ))}
      </ol>
    </nav>
  );
}
