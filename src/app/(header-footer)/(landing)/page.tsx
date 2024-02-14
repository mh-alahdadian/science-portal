'use client';

import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import BrainIllustration from './assets/Brain.svg';
import Articles from './components/articles';
import Books from './components/books';
import News from './components/news';
import Recommendations from './components/recommendations';
import Scopes from './components/scopes';

const sections = [
  { title: 'حوزه‌های علوم شناختی', element: <Scopes />, showAllLink: '/scopes' },
  { title: 'جدیدترین اخبار', element: <News /> },
  { title: 'تازه‌ترین کتاب‌ها', element: <Books /> },
  { title: '', element: <Recommendations /> },
  { title: '', element: <Articles /> },
];

export default function LandingPage(props: PageProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <style jsx>{`
        section {
          width: 100%;
        }
      `}</style>
      <section className="flex">
        <div className="">
          <h1>سامانه جامع علوم شناختی</h1>
          <p>مجموعه کامل گروه‌ها و کتاب‌خانه‌های حوزه علوم شناختی و Cognitive Science</p>
          <div className="gap-2">
            <button className="btn btn-primary">
              مشاهده حوزه‌ها
              <CaretLeft />
            </button>
            <button className="btn btn-outline">ثبت‌نام</button>
          </div>
        </div>
        <BrainIllustration />
      </section>
      {sections.map((x, index) => (
        <section key={index}>
          <div className="flex justify-between items-center">
            <h3>{x.title}</h3>
            {x.showAllLink && (
              <Link href={x.showAllLink} className="btn">
                نمایش همه
                <CaretLeft />
              </Link>
            )}
          </div>
          {x.element}
        </section>
      ))}
    </div>
  );
}
