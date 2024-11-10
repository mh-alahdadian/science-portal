import { DateCell } from '@/components';
import { Check, X } from '@phosphor-icons/react';
import { AccessorKeyColumnDef, RowData, createColumnHelper } from '@tanstack/react-table';
import { userInfoColumns } from '../users/columns';

type User = Schema<'UserInfoDTO'>;

interface MembershipRequestDTO {
  id: number;
  user: Schema<'UserInfoDTO'>;
  scopeId: number;
  status: 'accepted' | 'rejected' | 'pending';
  reason?: string;
  requestedAt: string;
  respondAt?: string;
}

const columnHelper = createColumnHelper<MembershipRequestDTO>();

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    applyMembershipApproval?: (id: number, approvalStatus: boolean) => void;
  }
}

export const columns = [
  ...userInfoColumns
    .filter((c) => c.id !== 'actions')
    .map((c) => ({ ...c, accessorKey: 'user.' + c.accessorKey } as AccessorKeyColumnDef<MembershipRequestDTO, any>)),
  columnHelper.accessor('requestedAt', {
    header: 'زمان درخواست',
    enableSorting: false,
    cell: DateCell,
  }),
  columnHelper.accessor('respondAt', {
    header: 'زمان پاسخ',
    enableSorting: false,
    cell: DateCell,
  }),
  columnHelper.accessor('reason', {
    header: 'دلیل',
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell({ row }) {
      if (row.original.status !== 'pending') return;
      return (
        <div className="flex gap-4">
          <button className="btn-sm btn-circle btn-success">
            <Check size={24} className="text-white" />
          </button>
          <button className="btn-sm btn-circle btn-error">
            <X size={24} className="text-white" />
          </button>
        </div>
      );
    },
  }),
];
