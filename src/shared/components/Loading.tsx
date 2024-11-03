import { SpinnerGap } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <SpinnerGap size={64} className="animate-spin-slow text-primary fixed top-[calc(50vh-32px)]" />
    </div>
  );
}

export function dynamicWithLoading<P>(Component: ComponentType<P>) {
  return dynamic(() => Promise.resolve(Component), { ssr: false, loading: Loading });
}
