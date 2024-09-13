"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Select from "react-select";

import { queryService } from "@/api";
import { Breadcrumb, DatePickerField, Paginator } from "@/components";
import { useCurrentScope } from "@/hooks";
import NewsCard from "./NewsCard";
import { NewsSlider } from "./NewsSlider";
import { Recycle } from "@phosphor-icons/react";
import { DateObject } from "react-multi-date-picker";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function AllNews({ params }: PageProps<"scopeId">) {
  const scope = useCurrentScope();

  const { data: categories, isLoading: loadingCategories } = useSuspenseQuery({
    ...queryService("news:/v1/scope/{scopeId}/categories", {
      params: { path: { scopeId: params.scopeId } },
    }),
    select: (data) =>
      data.map(({ id, title }) => ({ value: id?.toString(), label: title })),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredDate, setFilteredDate] = useState<DateObject>();

  // TODO: correct send filters to api

  const latestNews = useSuspenseQuery(
    queryService("news:/v1/scope/{scopeId}/posts", {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          pageable: { page: currentPage, size: perPage },
          categoryIds: filteredCategories.map(({ id }) => id),
          sort: ["id,desc"],
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

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: "اخبار" }]} />
      <NewsSlider params={params} />

      <div
        className="flex items-center justify-between rounded-lg bg-white py-3 px-4 gap-4"
        style={{ backgroundColor: "#f5f7f8" }}
      >
        <div className="w-full flex gap-3">
          <Select
            isMulti
            isClearable
            isSearchable
            placeholder="موضوعات"
            isLoading={loadingCategories}
            value={filteredCategories}
            options={categories}
            onChange={handleCategoryFilterChange}
          />
          <DatePickerField
            label="تاریخ"
            value={filteredDate}
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

      <h3 className="text-lg font-bold">تازه ترین اخبار</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {latestNews.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      <Paginator
        current={currentPage}
        total={latestNews.length}
        pageSize={perPage}
        changePage={setCurrentPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
