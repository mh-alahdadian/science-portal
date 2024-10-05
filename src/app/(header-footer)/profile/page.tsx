'use client';

import { useProfile } from '@service/hooks';

export default function News({ params }: PageProps<'scopeId' | 'id'>) {
  const profile = useProfile();
  return <div>{}</div>;
}
