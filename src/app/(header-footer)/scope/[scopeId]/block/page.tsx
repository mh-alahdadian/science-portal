'use client';
import RightSideNav from './components/RightSideNav';
import Questions from './components/Questions';
import LeftSideNav from './components/LeftSideNav';
import { PencilSimple } from '@phosphor-icons/react';
export default function page() {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full flex h-full min-h-screen">
        <RightSideNav />
        <Questions />
        <LeftSideNav/>
      </div>
    </main>
  );
}