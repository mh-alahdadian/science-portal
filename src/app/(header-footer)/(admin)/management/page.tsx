'use client';
import { use } from 'react';

export default function News(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);
  return <div>مدیریت سامانه</div>;
}
