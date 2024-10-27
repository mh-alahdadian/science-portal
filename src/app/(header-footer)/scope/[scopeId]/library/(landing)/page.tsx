'use client';

import { queryService } from '@/api';
import { Breadcrumb, DatePickerField, InlineTextField, Paginator } from '@/components';
import { TextIcon } from '@/components/TextIcon';
import { createFileUrl } from '@/utils';
import { CaretLeft, Download } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState, use } from 'react';
import { DateObject } from 'react-multi-date-picker';
import Select from 'react-select';
import { BookInfo } from '../components/BookInfo';
import { BooksSlider } from './BooksSlider';

type Book = Schema<'ResponseDTO'>;

interface Filter {
  value?: string;
  label: string;
}

export default function Library(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [filteredTitle, setFilteredTitle] = useState<string>();
  const [filteredCategories, setFilteredCategories] = useState<readonly Filter[]>([]);
  const [filteredDate, setFilteredDate] = useState<DateObject | null>(null);

  const { data: categories, isLoading: loadingCategories } = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
    select: (data) => data.map(({ id, title }) => ({ value: id?.toString(), label: title })),
  });

  const filteredDateString = filteredDate?.toDate().toISOString().split('T')[0];

  const booksData = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books', {
      params: {
        path: params,
        query: {
          sort: ['id,desc'],
          categoryIds: filteredCategories.map((c) => Number(c.value)),
          name: filteredTitle,
          pageable: { page: currentPage, size: perPage },
          ...(filteredDateString ? { from: filteredDateString, to: filteredDateString } : {}),
        } as any,
      },
    })
  ).data;
  const books = booksData.content!;

  function removeFilters() {
    setFilteredTitle(undefined);
    setFilteredCategories([]);
    setFilteredDate(null);
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'کتابخانه' }]} />
      <BooksSlider params={params} />

      <div
        className="flex items-center justify-between rounded-lg bg-white py-3 px-4 gap-4"
        style={{ background: 'darkorange' }}
      >
        <div className="w-full flex gap-3">
          <InlineTextField
            value={filteredTitle}
            onChange={(e) => setFilteredTitle(e.target.value)}
            containerClassName="input-lg w-80"
            placeholder="جست‌و‌جو در عنوان"
          />

          <Select
            isMulti
            isClearable
            isSearchable
            placeholder="موضوعات"
            isLoading={loadingCategories}
            value={filteredCategories}
            options={categories}
            styles={{
              multiValue: (baseStyles) => ({
                ...baseStyles,
                alignItems: 'center',
              }),

              container: (baseStyles) => ({
                ...baseStyles,
                minWidth: 300,
              }),
            }}
            onChange={setFilteredCategories}
          />
          <DatePickerField label="تاریخ" value={filteredDate} style={{ minWidth: 140 }} onChange={setFilteredDate} />
        </div>

        <button className="btn btn-sm text-sm font-normal" onClick={removeFilters}>
          حذف فیلتر‌ها
        </button>
      </div>

      <div className="grid max-md:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <Link href={`library/book/${book.id}`} key={book.id} className="card card-body bg-white rounded-lg">
            <figure>
              <img src={createFileUrl(book.coverImage, book.fileKey)} alt={book.name} className="object-contain h-60" />
            </figure>
            <BookInfo book={book} />
            <hr className="mt-auto" />
            <div className="flex justify-between items-center">
              <TextIcon Icon={Download} text={5700 + 'بار دانلود'} />
              <button className="btn-primary btn-link">
                مشاهده بیشتر
                <CaretLeft />
              </button>
            </div>
          </Link>
        ))}
      </div>

      <Paginator
        current={currentPage}
        total={booksData.totalPages!}
        pageSize={perPage}
        changePage={setCurrentPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
