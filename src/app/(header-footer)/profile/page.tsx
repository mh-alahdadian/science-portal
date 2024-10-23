'use client';

import { Breadcrumb } from '@/components';
import { Tabs } from '@/components/Tabs';
import { useProfile } from '@/hooks';
import { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';

const tabs = [
  { value: 'profile', title: 'اطلاعات کاربری' },
  { value: 'security', title: 'امنیت' },
  { value: 'roles', title: 'نقش' },
];

export default function News({ params }: PageProps<'scopeId' | 'id'>) {
  const [tab, setTab] = useState(tabs[0].value);
  const profile = useProfile();

  return (
    <>
      <Breadcrumb items={[{ text: 'پروفایل' }]} params={params} />
      <div className="flex gap-6">
        <div className="card flex-1">
          <Tabs options={tabs} active={tab} onChange={setTab} className="mb-6" />
          <PersonalInfo profile={profile!} />
        </div>
        <div className="card flex-1">
          <div className="card-title">حوزه‌های من</div>
        </div>
      </div>
    </>
  );
}
