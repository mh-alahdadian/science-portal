"use client";

import { DateObject } from "react-multi-date-picker";
import clsx from "clsx";
import Select from "react-select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import Recommendations from "src/app/(header-footer)/(landing)/components/recommendations";

import { queryService } from "@/api";
import { Breadcrumb, DatePickerField, Paginator } from "@/components";
import { useCurrentScope } from "@/hooks";
import NewsCard from "./NewsCard";
import { NewsSlider } from "./NewsSlider";

const sorts = [
  {
    value: "id,desc",
    label: "جدیدترین‌ها",
  },
  {
    value: "viewCount,desc",
    label: "پربازدیدترین‌ها",
  },
  {
    value: "commentCount,desc",
    label: "پربحث‌ترین‌ها",
  },
];

const allCategories = { value: "all", label: "همه‌ی موضوعات" };

export default function AllNews({ params }: PageProps<"scopeId">) {
  const scope = useCurrentScope();

  const { data: categories, isLoading: loadingCategories } = useSuspenseQuery({
    ...queryService("news:/v1/scope/{scopeId}/categories", {
      params: { path: { scopeId: params.scopeId } },
    }),
    select: (data) => [
      allCategories,
      ...data.map(({ id, title }) => ({ value: id?.toString(), label: title })),
    ],
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [filteredCategories, setFilteredCategories] = useState([allCategories]);
  const [filteredDate, setFilteredDate] = useState<DateObject>();
  const [currSorting, setCurrSorting] = useState(sorts[0].value);

  const selectedAllCategories = filteredCategories.some(
    ({ value }) => value === allCategories.value
  );

  // const url = currSorting === "commentCount,desc" ? 'news:/v1/scope/{scopeId}/posts/most-controversial' : "news:/v1/scope/{scopeId}/posts"

  const latestNews = useSuspenseQuery(
    queryService("news:/v1/scope/{scopeId}/posts", {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          pageable: { page: currentPage, size: perPage },
          sort: [currSorting],
          categoryIds: selectedAllCategories
            ? categories.map(({ value }) => value)
            : filteredCategories.map(({ value }) => value),
        } as any,
      },
    })
  ).data.content!;

  function handleCategoryFilterChange(newFilter) {
    setFilteredCategories(newFilter);
  }

  function removeFilters() {
    setFilteredCategories([]);
    setFilteredDate(null);
  }

  // const mostCommented: any[] = useSuspenseQuery(
  //   queryService('news:/v1/scope/{scopeId}/posts/most-controversial', {
  //     params: {
  //       path: { scopeId: +params.scopeId },
  //       query: { periodLength: 7 },
  //     },
  //   }),
  // ).data! as any;

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: "اخبار" }]} />
      <NewsSlider params={params} />

      <div
        className="flex items-center justify-between rounded-lg bg-white py-3 px-4 gap-4"
        style={{ backgroundColor: "#f5f7f8" }}
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-3">
          <Select
            isMulti
            isClearable
            isSearchable
            placeholder="موضوعات"
            isLoading={loadingCategories}
            value={filteredCategories}
            options={categories}
            // styles={{
            //   control: (baseStyles) => ({
            //     ...baseStyles,
            //     maxHeight: 42,
            //     minWidth: 100,
            //   }),
            // }}
            onChange={handleCategoryFilterChange}
          />
          <DatePickerField
            label="تاریخ"
            value={filteredDate}
            style={{ minWidth: 70 }}
            onChange={(date: DateObject) => setFilteredDate(date)}
          />
        </div>

        <button
          className="btn btn-sm text-sm font-normal"
          onClick={removeFilters}
        >
          حذف فیلتر‌ها
        </button>
      </div>

      <div role="tablist" className="tabs tabs-bordered w-20 mb-4">
        {sorts.map((tab) => (
          <a
            role="tab"
            className={clsx("tab", currSorting === tab.value && "tab-active")}
            onClick={() => setCurrSorting(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {latestNews.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* <Recommendations /> */}

      <Paginator
        current={currentPage}
        total={latestNews.length}
        pageSize={perPage}
        changePage={setCurrentPage}
        // changePageSize={setPerPage}
      />
    </div>
  );
}
