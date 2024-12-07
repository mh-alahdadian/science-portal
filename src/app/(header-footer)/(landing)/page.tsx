'use client';

import { getParsedToken } from '@/api';
import { css } from '@emotion/react';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import Articles from './components/articles';
import Books from './components/books';
import News from './components/news';
import Recommendations from './components/recommendations';
import Scopes from './components/scopes';

const sections = [
  {
    title: 'حوزه‌های علوم شناختی',
    element: <Scopes />,
    showAllLink: '/scopes',
  },
  { title: 'جدیدترین اخبار', element: <News /> },
  { title: 'تازه‌ترین کتاب‌ها', element: <Books /> },
  {
    title: 'پیشنهاد میکنیم',
    element: <Recommendations />,
    props: { css: { padding: '2rem', color: 'white', background: "#13225F url('/static/mid-hero.svg')}" } },
  },
  { title: 'مقالات روز', element: <Articles /> },
];

export default function LandingPage(props: PageProps) {
  const token = getParsedToken();
  return (
    <div className="flex flex-col gap-20 w-full">
      <section className="flex w-full" css={heroSection}>
        <div className="flex flex-col gap-6 my-auto max-w-xl text-white">
          <h1 className="text-[40px] font-medium">سامانه جامع علوم شناختی</h1>
          <p className="text-2xl font-semibold">
            مجموعه کامل گروه‌ها و کتاب‌خانه‌های حوزه‌های پژوهشی علوم شناختی و Cognitive Science
          </p>
          <div className="flex gap-4">
            <button className="btn-white flex-1 max-w-60 rounded-full">
              مشاهده حوزه‌های پژوهشی
              <CaretLeft />
            </button>
            {!token && <button className="btn-outline flex-1 max-w-60">ثبت‌نام</button>}
          </div>
        </div>
        {/* <BrainIllustration /> */}
      </section>
      {sections.map((section, index) => (
        <section key={index} {...section.props}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold">{section.title}</h3>
            {section.showAllLink && (
              <Link href={section.showAllLink} role="button">
                نمایش همه
                <CaretLeft />
              </Link>
            )}
          </div>
          {section.element}
        </section>
      ))}
    </div>
  );
}

const heroSection = css`
  width: calc(100vw - 15px);
  margin-left: calc(var(--screen-padding) * -1);
  padding-left: var(--screen-padding);
  height: 50rem;

  background-image: url('/static/hero.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0b1442;
`;
