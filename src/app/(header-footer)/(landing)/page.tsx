"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BrainIllustration from "./assets/Brain.svg";
import Articles from "./components/articles";
import Books from "./components/books";
import News from "./components/news";
import Recommendations from "./components/recommendations";
import Scopes from "./components/scopes";

const sections = [
  {
    title: "حوزه‌های علوم شناختی",
    element: <Scopes />,
    showAllLink: "/scopes",
  },
  { title: "جدیدترین اخبار", element: <News /> },
  { title: "تازه‌ترین کتاب‌ها", element: <Books /> },
  { title: "پیشنهاد میکنیم", element: <Recommendations /> },
  { title: "مقالات روز", element: <Articles /> },
];

export default function LandingPage(props: PageProps) {
  return (
    <div className="flex flex-col gap-20 w-full">
      <section className="flex justify-around w-full">
        <div className="flex flex-col gap-6 my-auto max-w-xl">
          <h1 className="text-5xl font-medium">سامانه جامع علوم شناختی</h1>
          <p className="text-2xl font-bold">
            مجموعه کامل گروه‌ها و کتاب‌خانه‌های حوزه‌های پژوهشی علوم شناختی و
            Cognitive Science
          </p>
          <div className="flex gap-4">
            <button className="btn-primary flex-1 max-w-52">
              مشاهده حوزه‌های پژوهشی
              <CaretLeft />
            </button>
            <button className="btn-outline flex-1 max-w-52">ثبت‌نام</button>
          </div>
        </div>
        <BrainIllustration />
      </section>
      {sections.map((x, index) => (
        <section key={index}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold">{x.title}</h3>
            {x.showAllLink && (
              <Link href={x.showAllLink} role="button">
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
