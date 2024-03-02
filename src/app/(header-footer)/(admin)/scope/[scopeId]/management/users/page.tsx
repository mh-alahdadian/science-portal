'use client';

import { mutateService, queryService } from '@/api';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

type Options = GridOptions<Schema<'UserInfoDTO'>>;

const colDefs: Options['columnDefs'] = [
  { field: 'firstName', editable: true },
  { field: 'lastName', editable: true },
  { field: 'email' },
  { field: 'enable', editable: true },
];

export default function UserManagement({ params }: PageProps<'scopeId' | 'id'>) {
  const users = useSuspenseQuery(queryService('core:/users', {})).data.content;

  const { mutate: mutateUser } = useMutation(mutateService('put', 'core:/users/{userId}'));
  const handleEdit: Options['onCellValueChanged'] = (e) => {
    if (e.data?.id) {
      mutateUser({ body: e.data, params: { path: { userId: e.data.id } } });
    }
  };
  return (
    <AgGridReact
      editType="fullRow"
      onRowValueChanged={handleEdit}
      onCellValueChanged={handleEdit}
      enableRtl
      className="ag-theme-quartz-dark"
      rowData={users}
      columnDefs={colDefs}
    />
  );
}
