'use client';

import { Breadcrumb } from '@/components';
import { Tabs } from '@/components/Tabs';
import { useProfile, useScreen } from '@/hooks';
import { use, useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { Roles } from './Roles';
import SecurityTab from './SecurityTab';

const scopesTab = { value: 'scopes', title: 'حوزه‌های من' };
const desktopTabs = [
  { value: 'profile', title: 'اطلاعات کاربری' },
  { value: 'security', title: 'امنیت' },
];
const mobileTabs = [...desktopTabs, scopesTab];

export default function Profile(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);
  const [tab, setTab] = useState(desktopTabs[0].value);
  const profile = useProfile();

  const { isSmall } = useScreen();

  const activeTab = tab === scopesTab.value && !isSmall ? desktopTabs[0].value : tab;

  return (
    <>
      <Breadcrumb items={[{ text: 'پروفایل' }]} params={params} />
      <div className="flex gap-6">
        <div className="card flex-1">
          <Tabs options={isSmall ? mobileTabs : desktopTabs} active={activeTab} onChange={setTab} className="mb-6" />
          {activeTab === 'profile' && <PersonalInfo profile={profile!} />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'scopes' && <Roles profile={profile!} />}
        </div>
        {!isSmall && (
          <div className="card flex-1">
            <div className="card-title mb-6">{scopesTab.title}</div>
            <Roles profile={profile!} />
          </div>
        )}
      </div>
    </>
  );
}
