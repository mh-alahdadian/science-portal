'use client';

import { useScopePrefix } from '@/hooks/scope';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';

interface Props {
  title: string;
  path: string;
  items: Schema<'CategoryDTO'>[];
}

export function ServiceMenu(props: Props) {
  const prefix = useScopePrefix();
  const [anchorEl, setElement] = useState<Element | null>(null);

  const open: MouseEventHandler = (event) => setElement(event.currentTarget);
  const close: MouseEventHandler = (event) => setElement(null);

  return (
    <div className="dropdown">
      {/*! remove /all when nextjs supported optional slug */}
      <Link className="btn btn-info btn-link" href={`${prefix}/${props.path}/all`} onMouseOver={open}>
        {props.title}
      </Link>
      <ul className="dropdown-content z-[1] menu">
        {props.items.map((category) => (
          <Link key={category.id} href={`${prefix}/${props.path}/${category.id}`} onClick={close}>
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
