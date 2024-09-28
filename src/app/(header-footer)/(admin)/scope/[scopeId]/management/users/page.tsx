"use client";

import { queryService } from "@/api";
import { Dialog, Table } from "@/components";
import { Pen, Trash } from "@phosphor-icons/react";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GridOptions, ICellRendererParams } from "ag-grid-community";
import { prop } from "ramda";
import { useState } from "react";
import UserEditForm from "./UserEditForm";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";

type User = Schema<"UserInfoDTO">;

export default function UserManagement({
  params,
}: PageProps<"scopeId" | "id">) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const usersQuery = useSuspenseQuery(
    queryService("core:/v1/manager/{page}/users", {
      params: {
        path: { page: String(params.scopeId) },
        query: { searchDTO: {}, pageable: { page: 0, size: 20 } },
      },
    })
  );
  const users = usersQuery.data.content!;

  const handleRowClick = (user: User) => {
    console.log("user", user);

    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
  });

  const [editingUser, setEditingUser] = useState<User | null>(users[0]);

  return (
    <>
      <Table
        onRowClick={handleRowClick}
        currentScope={params.scopeId}
        table={table}
        hasData={!!users}
        isLoading={usersQuery.isLoading}
      />

      <Dialog
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
      >
        {editingUser && (
          <UserEditForm
            setIsModalVisible={setIsEditModalVisible}
            user={editingUser}
            currentScope={params.scopeId}
          />
        )}
      </Dialog>
    </>
  );
}
