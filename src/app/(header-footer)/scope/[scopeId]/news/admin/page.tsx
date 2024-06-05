'use client';

import { useCurrentScope } from "@/hooks";
import { CaretLeft } from "@phosphor-icons/react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useMemo, useState } from "react";
import { newsSingleCard } from "src/types/news";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { mutateService, queryService } from "@/api";
import { title } from "process";
import { columns } from "./cols"

import { useReactTable, TableOptions, Column, createColumnHelper, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import React from "react";
import Link from "next/link";
import TopicsTab from "./AdminTopicsTab";




// @ts-ignore


export default function Admin({ params }: PageProps<'scopeId' | 'id'>) {
    const [pageNumber, setPageNumber] = useState(1)
    const [isCommentsVisible, setIsCommentsVisible] = useState(false)

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const scope = useCurrentScope()





    const data = useSuspenseQuery(
        {
            ...queryService('news:/v1/scope/{scopeId}/posts', {
                params: { path: { scopeId: +params.scopeId }, query: {} },
            }),

            queryFn: () => {
                return {
                    totalPages: 1,
                    totalElements: 1,
                    size: 1,
                    content: [{
                        id: 1,
                        title: "string",
                        coverImage: "string",
                        content: "string",
                        statusId: 2,
                        userId: 2,
                        categoryId: 2,
                        isPublic: true,
                        publishAt: "2022/12/12 , 12:12",

                        updateAt: "2022/12/12 , 12:12",

                    }]
                }
            }
        }
    ).data.content;

    console.log(data)



    const { mutate } = useMutation(mutateService("post", "news:/v1/manager/{page}/posts/{postId}/status"))

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        state: {
            //...
            pagination,
        },
        meta: {handleChangeStatus}

    })

    const categories = useSuspenseQuery(
        {
            ...queryService('news:/v1/scope/{scopeId}/categories', {
                params: { path: { scopeId: +params.scopeId, } },
            }),

            queryFn: () => {
                return [{
                    title: "title",
                    id: 1,
                    scopeId: 1,
                    parentId: 1,
                    children: [],



                }]
            }
        }
    ).data;



    function handleChangeStatus(e:any, id: string) {
        debugger
        mutate({ params: { path: { page: String(params.scopeId!), postId: +id }, query: { statusId: e.target.value } } })
        
    }

    return (
        <div className="max-w-7xl mx-auto ">

            {/* sidebar */}
            <div className="basis-8 flex flex-col justify-center h-[90vh] gap-6 fixed top-0 right-0">
                <button onClick={() => { setPageNumber(0) }}>
                    <svg preserveAspectRatio="none" className="w-16 h-16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                        <path d="M44 16V36H29L24 41L19 36H4V6H34" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M23 20H25.0025" stroke="#000000" stroke-width="4" stroke-linecap="round" />
                        <path d="M33.0011 20H35" stroke="#000000" stroke-width="4" stroke-linecap="round" />
                        <path d="M13.001 20H14.9999" stroke="#000000" stroke-width="4" stroke-linecap="round" />
                        <circle cx="43" cy="7" r="3" fill="#000000" />
                    </svg>
                </button>

                <button onClick={() => { setPageNumber(1) }}>
                    <svg preserveAspectRatio="none" className="w-16 h-16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="#000000" fill-rule="evenodd" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
                    </svg>
                </button>

            </div>

            {/* main */}
            <div className="w-full">

                {/* topics section */}
                {pageNumber === 0 &&
                    <div className="pr-10">
                        <TopicsTab scopeId={params.scopeId} />


                    </div>
                }

                {/* news section */}
                {pageNumber === 1 &&
                    <div className="pr-10 py-8">
                        <table className="w-full min-w-fit">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="py-2">عنوان</th>
                                    <th className="py-2">زمان ایجاد</th>
                                    <th className="py-2">وضعیت انتشار</th>

                                </tr>
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, index) => {

                                    const c = new Date(row.original.createAt!).toLocaleString('fa-IR');

                                    return (
                                        
                                        <tr key={row.id} className={`${index % 2 ? "bg-gray-200" : ""}`}>

                                            {row.getVisibleCells().map((cell: any) => (
                                                <td key={cell.id} className="py-2">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}

                                            {/* <td className="py-2">
                                                {row.original.id}
                                            </td>
                                            <td className="py-2">
                                                <Link className="underline" href={`${row.original.id}`}>
                                                    {row.original.title}
                                                </Link>
                                            </td>
                                            <td className="py-2">
                                                {c}
                                            </td>
                                            <td className="py-2">
                                                {row.original.isPublic ? "عمومی" : "فقط برای مدیران"}
                                                {row.original.isPublic ? <button className="mr-4 p-2 bg-red-200 rounded-md" onClick={() => {

                                                    mutate({ params: { path: { page: String(params.scopeId!), postId: row.original.id! }, query: { statusId: "6" } } })


                                                }}>لغو انتشار</button>
                                                    :
                                                    <button className="mr-4 p-2 bg-red-200 rounded-md" onClick={() => {

                                                        console.log("publish post")


                                                    }}>انتشار</button>
                                                }
                                            </td> */}



                                        </tr>
                                        
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="flex gap-4 justify-center mt-3">
                            <button
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<'}
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>'}
                            </button>
                            <button
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </button>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                            <span>
                                صفحه
                                {pageNumber}
                                از
                                {Math.ceil(data?.length / pagination.pageSize)}
                            </span>
                        </div>
                    </div>
                }



            </div>
        </div>
    );
}
