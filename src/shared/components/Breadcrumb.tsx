import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  items: { icon?: string; url?: string; text: string }[];
}

export function Breadcrumb(props: Props) {
  return (
    <nav className='breadcrumbs'>
      <ol>
        {props.items.map((item, index) => {
          const LinkOrFragment = item.url ? Link : Fragment;
          return (
            <li key={index}>
              <LinkOrFragment href={item.url!}>{item.text}</LinkOrFragment>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
