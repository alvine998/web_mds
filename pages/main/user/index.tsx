import Button from '@/components/Button'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'

import React, { Fragment, useEffect, useState } from 'react'
import Input from '@/components/Input'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context: any) => {
    try {
        let { search } = context.query
        const result = await axios.get(process.env.URL_API + `/users?search=${search || ""}`, {
            headers: {
                'bearer-token': 'serversalesproperties2023'
            }
        })
        return {
            props: {
                users: result?.data?.items || [],
                uri: process.env.URL_API
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function Dashboard({ users, uri }: { users: any, uri: string }) {
    const [modal, setModal] = useState<any>({
        open: false,
        data: null,
        key: ""
    })
    const [info, setInfo] = useState('')
    const router: any = useRouter();
    const [filter, setFilter] = useState<any>(router.query)
    const [showTable, setShowTable] = useState<boolean>(false);

    const save = async (e: any) => {
        e?.preventDefault();
        const formdata: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formdata,
                password: formdata?.password ? formdata?.password : modal?.data?.password
            }

            let url: any = null
            if (modal?.key == 'create') {
                url = axios.post(CONFIG.base_url.api + '/user', payload, {
                    headers: {
                        'bearer-token': 'serversalesproperties2023'
                    }
                })
            } else {
                url = axios.patch(CONFIG.base_url.api + '/user', payload, {
                    headers: {
                        'bearer-token': 'serversalesproperties2023'
                    }
                })
            }

            const result = await url
            setModal({ ...modal, open: false, data: null })
            Swal.fire({
                text: "Berhasil Simpan Data",
                icon: "success"
            })
            router.push('user')
        } catch (error: any) {
            console.log(error);
            setInfo(error.message)
        }
    }

    const remove = async (e: any) => {
        e?.preventDefault();
        const formdata: any = Object.fromEntries(new FormData(e.target))
        try {
            const result = await axios.delete(CONFIG.base_url.api + `/user?id=${formdata?.id}`, {
                headers: {
                    'bearer-token': 'serversalesproperties2023'
                }
            })
            setModal({ ...modal, open: false, data: null })
            Swal.fire({
                text: "Berhasil Hapus Data",
                icon: "success"
            })
            router.push('user')
        } catch (error: any) {
            console.log(error);
            setInfo(error.message)
        }
    }

    const columns: any = [
        {
            name: "Nama",
            selector: (row: Users) => row?.name
        },
        {
            name: "Email",
            selector: (row: Users) => row?.email
        },
        {
            name: "No HP",
            selector: (row: Users) => row?.phone
        },
        {
            name: "Peran",
            selector: (row: Users) => row?.role?.replace("_", " ")
        },
        {
            name: "Aksi",
            selector: (row: Users) => <>
                <button onClick={() => {
                    setModal({ ...modal, open: true, data: row, key: "update" })
                }} className='text-green-500'>
                    Edit
                </button>
                &nbsp;
                <button onClick={() => {
                    setModal({ ...modal, open: true, data: row, key: "delete" })
                }} className='text-red-500 ml-2'>
                    Hapus
                </button>
            </>
        },
    ]

    const valueRadio = [
        { value: 'admin', label: "Admin" },
        { value: 'super_admin', label: "Super Admin" }
    ]

    useEffect(() => {
        if (window !== undefined) {
            setShowTable(true)
        }
    }, [])

    useEffect(() => {
        if (info) {
            setTimeout(() => {
                setInfo('')
            }, 3000);
        }
        const queryFilter = new URLSearchParams(filter).toString();
        router.push(`?${queryFilter}`)
    }, [info, filter])

    return (
        <Fragment>
            <Layout title='Dashboard'>
                <div>
                    <h1 className='font-bold text-xl underline'>DATA USER</h1>
                    <div className='w-full md:mt-10 flex justify-between items-center'>
                        <div className='w-1/6'>
                            <Button onClick={() => {
                                setModal({ ...modal, open: true, data: null, key: "create" })
                            }} label='Buat User' />
                        </div>
                        <Input placeholder='Cari' name='search' defaultValue={filter?.search || ""} onChange={(e: any) => { setFilter({ ...filter, search: e.target.value }) }} />
                    </div>
                    <div className='mt-2'>
                        {
                            showTable ?
                                <DataTable
                                    columns={columns}
                                    data={users}
                                    pagination={true}
                                    selectableRows
                                /> : ""
                        }
                    </div>
                    {
                        modal.key == "create" || modal.key == "update" ?
                            <Modal open={modal.open} setOpen={() => { setModal({ ...modal, open: false }) }}>
                                <>
                                    <form onSubmit={save} className='p-4'>
                                        <Input required defaultValue={modal?.data?.name || ""} label='Nama' placeholder='Masukkan Nama' name='name' />
                                        <Input required defaultValue={modal?.data?.phone || ""} label='No Hp' placeholder='Masukkan No Hp' name='phone' />
                                        <Input required defaultValue={modal?.data?.email || ""} label='Email' placeholder='Masukkan Email' name='email' />
                                        <Input required label='Password' placeholder='Masukkan Password' type='password' name='password' />
                                        <input name='id' value={modal?.data?.id || ""} className='hidden' />
                                        <div className='mt-3'>
                                            <label htmlFor="radio1">Peran</label>
                                            <div className='flex gap-2'>
                                                {
                                                    valueRadio?.map((v: any) => (
                                                        <div key={v?.value} className='flex gap-2'>
                                                            <input required type='radio' value={v?.value} defaultChecked={v?.value == valueRadio[0]?.value || v?.value == modal?.data?.role} name='role' id='radio1' />
                                                            <span>{v?.label}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <p className='text-red-500 my-3'>
                                            {info}
                                        </p>
                                        <div className="bg-gray-50 w-full gap-2 py-3 sm:flex">
                                            <button
                                                type="button"
                                                className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                                                onClick={() => setModal({ ...modal, open: false })}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="mt-3 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600 sm:mt-0"
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </>
                            </Modal> : ""
                    }
                    {
                        modal.key == "delete" ?
                            <Modal open={modal.open} setOpen={() => { setModal({ ...modal, open: false }) }}>
                                <>
                                    <form onSubmit={remove} className='p-4'>
                                        <h1 className='text-lg text-center font-sans font-bold my-2'>Hapus Data</h1>
                                        <p className='text-center'>Anda yakin ingin menghapus {modal?.data?.name}?</p>
                                        <p className='text-red-500 my-3'>
                                            {info}
                                        </p>
                                        <input className='hidden' name='id' value={modal.data.id} />
                                        <div className="bg-gray-50 w-full gap-2 py-3 sm:flex">
                                            <button
                                                type="button"
                                                className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                                                onClick={() => setModal({ ...modal, open: false })}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="mt-3 w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </form>
                                </>
                            </Modal> : ""
                    }
                </div>
            </Layout>
        </Fragment>
    )
}