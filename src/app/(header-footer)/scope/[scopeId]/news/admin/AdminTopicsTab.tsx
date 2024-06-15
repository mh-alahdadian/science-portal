'use client';

import { useCurrentScope } from "@/hooks";
import { CaretLeft } from "@phosphor-icons/react";
import { Clock, X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useMemo, useState } from "react";
import { newsSingleCard } from "src/types/news";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { mutateService, queryService } from "@/api";
import { title } from "process";
import { columns } from "./topicsCols"

import { useReactTable, TableOptions, Column, createColumnHelper, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import React from "react";
import Link from "next/link";




// @ts-ignore


export default function TopicsTab(props) {
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState(true)

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });


    const { mutate } = useMutation(mutateService("patch", "news:/v1/manager/{page}/categories/{categoryId}/enable"))






    const data = useSuspenseQuery(
        {
            ...queryService('news:/v1/scope/{scopeId}/categories', {
                params: { path: { scopeId: props.scopeId } },
            }
            ),

            queryFn: () => {
                return [{
                    id: 1,
                    title: "cat",
                    scopeId: 1,
                }]
            }


        }).data;

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

    })


    function handleCatNameClick(cat: any) {
        setSelectedCategory(cat)
        setIsModalVisible(true)



    }


    function confirmChanges() {

        // bayad check beshe
        // mutate({ params: { path: props.scopeId, query: { enable: true } } })


    }


    function disableCat(id: string) {
        mutate({params: {path: {categoryId: +id, page: props.scopeId},query: {enable: false} }})
    }



    return (
        <div className="relative min-h-screen overflow-y-auto">
            <table className="w-full min-w-fit">
                <thead className="bg-gray-400">
                    <tr>
                        <th className="py-2">id</th>
                        <th className="py-2">عنوان</th>
                        <th className="py-2">وضعیت انتشار</th>

                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row: any) => {

                        return (
                            
                            <tr onClick={() => handleCatNameClick(row.original)} key={row.id} className="even:bg-gray-200 cursor-pointer" >

                                {row.getVisibleCells().map((cell: any) => (
                                    <td className="py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}


                            </tr>
                        )
                    })}
                </tbody>
            </table>


            {selectedCategory && isModalVisible &&
                <div className="absolute w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-8">
                    <form action="#">
                        <div className="mb-3">
                            <span>id:</span>
                            <span>{selectedCategory?.id ? selectedCategory.id : "undefined"}</span>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="title">عنوان:</label>
                            <input type="text" id="title" value={selectedCategory.title} onChange={(e) => {
                                setSelectedCategory({
                                    ...selectedCategory,
                                    title: e.target.value
                                })
                            }} />
                        </div>
                        <button onClick={() => disableCat(selectedCategory.id)} className="btn bg-red-700 px-4 py-2 text-white">غیرفعال کردن</button>
                        <button onClick={confirmChanges} className="btn bg-green-700 px-4 py-2 text-white mx-4">ثبت تغییرات</button>

                    </form>

                    {/* <svg onClick={() => setIsModalVisible(false)} className="absolute cursor-pointer top-0 right-0 translate-x-1/2 -translate-y-1/2" fill="#ff0000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg> */}

                            <X size={32} onClick={() => setIsModalVisible(false)} className="absolute cursor-pointer top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                </div>
            }
        </div>
    );
}
