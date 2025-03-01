import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import SubmitSearch from "../../Buttons/SubmitSearch"
import AuthorModal from "../../Modals/AuthorModal"
import Pagination from "../../Pagination/Pagination"
import TableHeader from "../../TableHeader/TableHeader"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableRow from "../../TableRow/TableRow"
import Select from 'react-select'
import EditBtn from "../../Buttons/EditBtn"
import SelectBtn from "../../Buttons/SelectBtn"
import SelectedCounter from "../../SelectedCounter/SelectedCounter"
import AuthorNameTd from "./AuthorNameTd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { formatDateTime } from "@/utils"





function AuthorPage() {

    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const { register, handleSubmit, setValue } = useForm()
    const [selectedItems, setSelectedItems] = useState([])
    const [isEnableFloat, setIsEnableFloat] = useState(false)
    const [filteredList, setFilteredList] = useState({
        "firstName": "",
        "lastName": "",
        "enable": "",
        "page": currentPage
    })


    const { data: authors } = useQuery(queryService('library:/v1/authors', { params: { query: filteredList } }));
    const { content: data = [], totalPages: pages = 0 } = authors || {};

    const { mutateAsync: updateAuthor } = useMutation(mutateService('put', 'library:/v1/manager/{page}/authors/{authorId}'));
    async function putData(data, enableState) {
        const { id, firstName, lastName, description, coverImage } = data
        let newData = { coverImage, description, id, firstName, lastName, enable: enableState }
        await updateAuthor({ params: { path: { page: String(0), authorId: data.id } }, body: newData });
        setSelectedItems([])
        setTimeout(() => { window.location.reload() }, 300)

    }


    const columns = [
        {
            accessorKey: "id",
            header: "",
            size: 10,
            enableSorting: false,
            cell: (props) => <SelectBtn setSelectedItems={setSelectedItems} selectedItems={selectedItems} bookData={props.row.original} />
        },
        {
            accessorKey: "id",
            header: "ID",
            size: 30,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 50,
            enableSorting: false,
            cell: (props) => <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" className="m-auto cursor-pointer" style={{ maxHeight: "32px" }} />
        },
        {
            accessorKey: "firstName",
            header: "نام",
            cell: (props) => <AuthorNameTd props={props}/>
        },
        {
            accessorKey: "lastName",
            header: "نام خانوادگی",
            cell: (props) => <AuthorNameTd props={props}/>
        },
        {
            accessorKey: "createdAt",
            header: "ثبت",
            size: 80,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = formatDateTime(date)
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            size: 80,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = formatDateTime(date)
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        },
        {
            accessorKey: "enable",
            header: "وضعیت",
            size: 50,
            cell: (props) => <p>{(props.getValue()) ? "فعال" : "غیرفعال"}</p>
        },
        {
            accessorKey: "",
            header: "ویرایش",
            size: 30,
            enableSorting: false,
            cell: (props) => {
                return <EditBtn setEditModal={setEditModal} modalData={props.row} openModal={openModal} />
            }
        },

    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: filtering,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setFiltering,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()


    })

    function openModal() {
        setIsModalOpen(true)
    }

    function submit(data) {
        setCurrentPage(0)
        setFilteredList(data)
    }

    register("enable")

    function handleEnableChange(selectedOption) {
        setValue("enable", selectedOption.value)

        if (selectedOption) {
            setIsEnableFloat(true)
        }
        else
            setIsEnableFloat(false)
    }


    return (
        <>
            {(isModalOpen) && <AuthorModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <form className="flex items-end gap-4">
                    <div className="form-group w-44">
                        <input type="text" id="firstName" className="searchInput" placeholder="نام نویسنده" {...register("firstName")} />
                        <label htmlFor="firstName" className="searchLabel">نام نویسنده</label>
                    </div>
                    <div className="form-group w-44">
                        <input type="text" id="lastName" className="searchInput" placeholder="نام خانوادگی" {...register("lastName")} />
                        <label htmlFor="lastName" className="searchLabel">نام خانوادگی</label>
                    </div>
                    <div>
                        <div className="flex flex-col flex-1 w-44">
                            {(isEnableFloat) &&
                                <label htmlFor="enable" className="opacity-70 text-sm mb-1">وضعیت</label>
                            }
                            <Select options={[{ value: "", label: "همه" }, { value: true, label: "فعال" }, { value: false, label: "غیرفعال" }]} onChange={handleEnableChange} placeholder="وضعیت" />
                        </div>
                    </div>
                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
                <AddBtn onClick={openModal} />
            </div>

            {(selectedItems.length > 0) &&
                <SelectedCounter selectedItems={selectedItems} putData={putData} />
            }


            <table className="w-full relative border-collapse mt-10">

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                        return <TableHeaderItem header={header} key={index} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map((row, index) =>
                        <TableRow key={index} selected={(selectedItems.includes(row.original))}>
                            {
                                row.getVisibleCells().map((cell, index) =>
                                    <td key={index} width={cell.column.getSize()}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </td>
                                )
                            }
                        </TableRow>
                    )}
                </tbody>

            </table>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default AuthorPage