import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from '@phosphor-icons/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { mutateService, queryService } from '@/api';
import { useReactTable } from '@tanstack/react-table';
import { toast } from 'react-toastify';
import { prop } from 'ramda';


type User = Schema<'UserInfoDTO'>;

const UserEditForm = ({ user, currentScope, setIsModalVisible }) => {
    const newRoleRef = useRef(null)
    const [isEnabled, setIsEnabled] = useState(user.enable);
    const [roles, setRoles] = useState<Schema<"Role">[]>(user.userRoles[0].roles)

    const { mutate: mutateUserRoles } = useMutation(mutateService('post', 'core:/v1/manager/{page}/users/{userId}/roles'));
    const { mutate: mutateUserEnable } = useMutation(mutateService('patch', 'core:/v1/manager/{page}/users/{userId}/block-unblock'));

    const allRoles = useSuspenseQuery(
        queryService('core:/v1/manager/{page}/roles', { params: { path: { page: String(currentScope) } } }),
    ).data!;

    const { register, handleSubmit, control } = useForm({
        defaultValues: user
    });

    const onSubmit = (data) => {
        if(user.enable != isEnabled) {
            toggleEnabled()
        }

        handleUpdateRole(data)
    };

    const toggleEnabled = () => {
        mutateUserEnable(
            {
                params: {
                    path: {
                        userId: +user.id
                    }
                }
            }
            ,
            {
                onSuccess: () => {
                    toast.success("تغییرات با موفقیت انجام شد")
                }
            }
        )
    };

    const handleDeleteRole = (role: Schema<"Role">) => {
        setRoles(prev => {
            return (
            prev.filter(item => item.id != role.id)
        )})
    }

    const handleAddRole = () => {
        const newRole = JSON.parse(newRoleRef.current.value)
        setRoles(prev => (
            [
                {
                    ...prev[0],
                    roles: [
                        ...prev[0].roles,
                        newRole
                    ]
                }          
            ]
        ))
    }

    const handleUpdateRole = (data) => {
        console.log(roles.map(prop("id")))
        if (data?.id) {
            mutateUserRoles(
                {
                    params: {
                        path: { page: String(currentScope), userId: data.id },
                        query: { roleIds: roles.map(prop("id")) as number[] },
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("بروز رسانی نقش ها با موفقیت انجام شد")
                        setIsModalVisible(false)
                    },
                },
            );
        }
    };

    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>ویرایش کاربر</h2>
            <div className='flex gap-5 mt-4'>
                <span>نام:</span>
                <span>{user.firstName}</span>
            </div>
            <div className='flex gap-5 mt-4'>
                <label>نام خانوادگی:</label>
                <span>{user.lastName}</span>
            </div>
            <div className='flex gap-5 mt-4'>
                <label>آدرس ایمیل:</label>
                <span>{user.email}</span>
            </div>
            <div className='flex gap-5 mt-4'>
                <label>شماره موبایل:</label>
                <span>{user.phoneNumber}</span>
            </div>
            <div className='flex gap-5 mt-4'>
                <label>شغل:</label>
                <span>{user.job}</span>
            </div>
            <div className='flex gap-5 mt-4'>
                <label>تحصیلات:</label>
                <span>{user.educationTitle}</span>
            </div>
            <div className='flex gap-5 items-center mt-4'>
                <label>وضعیت حساب کاربری:</label>
                {isEnabled ? (
                    <button type="button" onClick={() => setIsEnabled(false)} title="تغییر به غیرفعال" className="bg-primary">فعال</button>
                ) : (
                    <button type="button" onClick={() => setIsEnabled(true)} title="تغییر به فعال" className="bg-error">غیرفعال</button>

                )}
            </div>
            <div className='flex flex-col gap-5 mt-4'>
                <h3>نقش ها:</h3>
                <div className='flex flex-wrap gap-2'>
                    {roles.map((role, index) => {
                        return (
                            <div className='flex gap-2 items-center px-2 bg-slate-100 shadow-md' key={role.id}>
                                <span>{role.title || ""}</span>
                                <button onClick={() => handleDeleteRole(role)} className='flex w-min !h-2 p-1'><X size={16} /></button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex gap-5 items-center mt-4'>
                <h3>نقش جدید:</h3>
                <select ref={newRoleRef}>
                    {allRoles.map(role => (
                        <option key={role.id} value={JSON.stringify(role)}>
                            {role.description}
                        </option>
                    ))}
                </select>
                <button type='button' onClick={handleAddRole}>اضافه کردن نقش</button>
            </div>

            <button className='mt-4' type="submit">ذخیره</button>
        </form>
    );
};

export default UserEditForm;