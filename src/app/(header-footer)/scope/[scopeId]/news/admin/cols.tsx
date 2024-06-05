
import { deriveLabelForUISchemaElement } from "@jsonforms/core";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";


const columnHelper = createColumnHelper<Schema<"PostDTO">>();




export const columns = [

    columnHelper.accessor('title', {
        header: 'عنوان خبر',
        cell: ({row}) => {
            
            return <Link className="underline text-blue-800 cursor-pointer" href={`${row.original.id}`}>{row.original.title}</Link>
        }
    }),

    columnHelper.accessor('publishAt', {
        cell: ({row}) => {
            const c = new Date(row.original.createAt!).toLocaleString('fa-IR');

            return c
        }
    }),

    columnHelper.accessor('isPublic', {
        cell: ({row, table}) => {
            const { handleChangeStatus } = table.options.meta as any;
            return (
            <select onChange={(e) => {
                handleChangeStatus(e, row.original.id)                
            }}>
                <option value="1">draft</option>
                <option value="2">در انتظار تایید</option>
                <option value="3">در انتظار اصلاح</option>
                <option value="4">در انتظار انتشار</option>
                <option value="5">منتشر شده</option>
                <option value="6">منتشر نشده</option>
            </select>)

            // return row.original.isPublic ? <button className="mr-4 p-2 bg-red-200 rounded-md" onClick={() => {

            //     // mutate({params: {path: {page: String(params.scopeId!), postId: row.original.id!}, query: {statusId: "6"}}})
            //     console.log("لغو انتشار")

            // }}>لغو انتشار</button>
            //     :
            //     <button className="mr-4 p-2 bg-red-200 rounded-md" onClick={() => {

            //         console.log("publish post")


            //     }}>انتشار</button>
            }
        
    }),

]



