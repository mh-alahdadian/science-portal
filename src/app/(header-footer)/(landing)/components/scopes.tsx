// 'use client';

import { queryService } from '@/api';
import { getScopeUrl } from '@/utils/scope';
import { BookOpenText, Users } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import IdeaIllustration from '../assets/Idea.svg';

function Scope(props: { scope: Schema<'ScopeDTO'> }) {
  const { scope } = props;
  return (
    <Link href={getScopeUrl(scope.id!)} className="card items-center p-4 gap-4">
      <IdeaIllustration />
      <p>{scope.title}</p>

      <div className="flex justify-between w-full">
        {[
          { data: 234, icon: <BookOpenText /> },
          { data: 15461, icon: <Users /> },
        ].map((obj, index) => (
          <div key={index}>
            <span className="text-xs me-2">{obj.data}</span>
            {obj.icon}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function Scopes() {
  const { data: scopes } = useSuspenseQuery(queryService('core:/v1/scopes', {}));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {scopes.map((scope) => (
        <Scope key={scope.id} scope={scope} />
      ))}
    </div>
  );
}
