'use client';;
import { use } from "react";

import { useProfile } from '@service/hooks';

export default function News(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);
  const profile = useProfile();
  return <div>{}</div>;
}
