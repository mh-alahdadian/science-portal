'use client';

import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { Fragment, MouseEventHandler, useState } from 'react';
import type { components } from 'src/generated/forum';

interface Props {
  title: string;
  path: string;
  items: components['schemas']['CategoryDTO'][];
}

export function ServiceMenu(props: Props) {
  const [anchorEl, setElement] = useState<Element | null>(null);

  const open: MouseEventHandler = (event) => setElement(event.currentTarget);
  const close: MouseEventHandler = (event) => setElement(null);

  return (
    <Fragment>
      <Button color="info" variant="text" className="block mx-2" onClick={open}>
        {props.title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={close}
      >
        {props.items.map((category) => (
          <MenuItem component={Link} key={category.id} href={`${props.path}/${category.id}`} onClick={close}>
            {/* <Link key={category.id} onClick={close} href={`${props.path}/${category.id}`}> */}
            {/* <Typography textAlign="center">{setting}</Typography> */}
            {category.title}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
