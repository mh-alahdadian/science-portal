'use client';

import { Breadcrumb } from '@/components';
import { Tabs } from '@/components/Tabs';
import { useProfile } from '@/hooks';
import { use, useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import SecurityTab from './SecurityTab';

const tabs = [
  { value: 'profile', title: 'اطلاعات کاربری' },
  { value: 'security', title: 'امنیت' },
  { value: 'roles', title: 'نقش' },
];

export default function Profile(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);
  const [tab, setTab] = useState(tabs[0].value);
  const profile = useProfile();

  return (
    <>
      <Breadcrumb items={[{ text: 'پروفایل' }]} params={params} />
      <div className="flex gap-6">
        <div className="card flex-1">
          <Tabs options={tabs} active={tab} onChange={setTab} className="mb-6" />
          {tab === 'profile' && <PersonalInfo profile={profile!} />}
          {tab === 'security' && <SecurityTab />}
        </div>
        <div className="card flex-1">
          <div className="card-title">حوزه‌های من</div>
        </div>
      </div>
    </>
  );
}
