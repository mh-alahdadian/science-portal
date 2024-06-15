'use client';

import { mutateService, queryService } from '@/api';
import { DataGrid, Form } from '@/components';
import { Pen, Trash } from '@phosphor-icons/react';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import { prop } from 'ramda';
import { useState } from 'react';

type User = Schema<'UserInfoDTO'>;
type Options = GridOptions<User>;

const colDefs: Options['columnDefs'] = [
  { headerName: 'نام', field: 'firstName' },
  { headerName: 'نام خانوادگی', field: 'lastName' },
  { headerName: 'ایمیل', field: 'email' },
  {
    headerName: 'actions',
    maxWidth: 102,
    cellRenderer: (props: ICellRendererParams) => {
      const setEditingUser = props.context.setEditingUser;
      return (
        <div className="flex gap-2">
          <button className="btn btn-circle btn-transparent btn-sm" onClick={() => setEditingUser(props.data)}>
            <Pen />
          </button>
          <button className="btn btn-circle btn-transparent btn-sm" onClick={() => setEditingUser(props.data)}>
            <Trash className="text-danger" />
          </button>
        </div>
      );
    },
  },
];

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    globalRoles: {
      title: 'نقش‌های عمومی کاربر',
      type: 'array',
      items: { type: 'number', enum: [1, 2, 3] },
      uniqueItems: true,
    },
    roles: {
      title: 'نقش‌های کاربر در این حوزه',
      type: 'array',
      items: { type: 'number', enum: [1, 2, 3] },
      uniqueItems: true,
    },
  },
};

const uiSchema: UiSchema = {
  'ui:title': 'ویرایش اطلاعات کاربر',
  'ui:classNames': 'my-class',
  'ui:submitButtonOptions': {
    submitText: 'ذخیره',
  },
};

function transform(user: User) {
  return {
    id: user.id,
    roles: user.roles!.map(prop('id')),
    globalRoles: user.roles!.map(prop('id')),
  };
}

export default function UserManagement({ params }: PageProps<'scopeId' | 'id'>) {
  const users = useSuspenseQuery(
    queryService('core:/v1/manager/{page}/users', { params: { path: { page: String(params.scopeId) }, query: {} } }),
  ).data.content!;

  const { mutate: mutateUser } = useMutation(mutateService('post', 'core:/v1/manager/{page}/users/{userId}/roles'));
  const handleEdit = (data: User) => {
    if (data?.id) {
      mutateUser(
        {
          params: {
            path: { page: String(params.scopeId), userId: data.id },
            query: { roleIds: data.roles!.map(prop('id')) as number[] },
          },
        },
        {
          onSuccess: () => {
            setEditingUser(null);
          },
        },
      );
    }
  };

  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <>
      <DataGrid
        onRowValueChanged={({ data }) => handleEdit(data)}
        context={{ setEditingUser }}
        rowData={users}
        columnDefs={colDefs}
      />
      <dialog open={!!editingUser} className="modal">
        <Form
          className="modal-box"
          schema={schema}
          validator={validator}
          formData={editingUser ? transform(editingUser) : null}
          uiSchema={uiSchema}
          onSubmit={(param) => handleEdit(param.formData)}
        />
        <div className="modal-backdrop" onClick={() => setEditingUser(null)}></div>
      </dialog>
    </>
  );
}
