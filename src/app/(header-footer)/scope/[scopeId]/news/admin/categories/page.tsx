'use client';

import { queryService } from '@/api';
import { Dialog, dynamicWithLoading, Table } from '@/components';
import { defaultPagination } from '@/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { use, useState } from 'react';
import { columns } from './cols';
import { Form } from './form';

function TopicsTab(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const [selectedCategory, setSelectedCategory] = useState<SchemaOf<'news', 'CategoryDTO'> | null>(null);

  const [pagination, setPagination] = useState(defaultPagination);

  const {
    data: categories,
    isError,
    isLoading,
    refetch,
  } = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
  });

  const table = useReactTable({
    columns,
    data: categories!,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      //...
      pagination,
    },
    meta: {
      setEditingItem: setSelectedCategory,
    },
  });

  return (
    <div className="">
      <Table table={table} hasData={!!categories} hasError={isError} isLoading={isLoading} refetch={refetch} />
      {selectedCategory && (
        <Dialog open={!!selectedCategory} onClose={() => setSelectedCategory(null)}>
          <Form params={params} selectedCategory={selectedCategory} closeModel={() => setSelectedCategory(null)} />
        </Dialog>
      )}
    </div>
  );
}

export default dynamicWithLoading(TopicsTab);
