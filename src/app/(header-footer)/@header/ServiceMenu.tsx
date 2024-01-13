'use client';

import { useScopePrefix } from '@/hooks/scope';
import { Button, MenuItem, Tooltip } from '@mui/material';
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

  const menu = (
    <div>
      {props.items.map((category) => (
        <MenuItem component={Link} key={category.id} href={`${prefix}/${props.path}/${category.id}`} onClick={close}>
          {category.title}
        </MenuItem>
      ))}
    </div>
  );

  return (
    <Tooltip title={menu}>
      {/*! remove /all when nextjs supported optional slug */}
      <Button color="info" variant="text" component={Link} href={`${prefix}/${props.path}/all`} onMouseOver={open}>
        {props.title}
      </Button>
    </Tooltip>
  );
}
