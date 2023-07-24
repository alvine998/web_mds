import Button from '@/components/Button'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, endAt, getDocs, orderBy, query, startAt, where } from 'firebase/firestore'

import React, { Fragment, useEffect, useState } from 'react'
import firebase_app, { db } from '@/config/firebase'
import Input from '@/components/Input'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'

const auth = getAuth(firebase_app);

export const getServerSideProps = async (context: any) => {
    try {
        let { search }: { search: any } = context.query
        const collection_ref = collection(db, "users")
        const q = query(
            collection_ref,
            orderBy('email'),
            startAt(search),
            endAt(search + '\uf8ff')
        )
        const users = await getDocs(q)
        console.log(search);
        return {
            props: {
                users: users.docs.map((doc: any) => doc.data()) || [],
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function Dashboard({ users }: { users: any }) {
    const [modal, setModal] = useState({
        open: false,
        data: null,
        key: ""
    })
    const [info, setInfo] = useState('')
    const router: any = useRouter();
    const [filter, setFilter] = useState<any>(router.query)

    const save = async (e: any) => {
        e?.preventDefault();
        const formdata: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formdata,
            }
            const result = await createUserWithEmailAndPassword(auth, formdata?.email, formdata?.password);
            if (result) {
                const addRef = await addDoc(collection(db, "users"), payload)
                Swal.fire({
                    text: "Berhasil Simpan Data",
                    icon: "success"
                })
            }
        } catch (error: any) {
            console.log(error.message);
            setInfo(error.message)
            Swal.fire({
                text: "Gagal Simpan Data",
                icon: "error"
            })
        }
    }

    const columns = [
        {
            name: "Nama",
            selector: (row: any) => row?.nama
        },
        {
            name: "Email",
            selector: (row: any) => row?.email
        },
        {
            name: "No HP",
            selector: (row: any) => row?.phone
        },
        {
            name: "Aksi",
            selector: (row: any) => <>
                <button className='text-green-500'>
                    Edit
                </button>
                &nbsp;
                <button className='text-red-500 ml-2'>
                    Hapus
                </button>
            </>
        },
    ]

    useEffect(() => {
        const queryFilter = new URLSearchParams(filter).toString();
        router.push(`?${queryFilter}`)
    }, [filter])

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
                        <Input placeholder='Cari' name='search' defaultValue={filter?.search || ""} onChange={(e: any) => setFilter({ ...filter, search: e?.target?.value })} />
                    </div>
                    <div className='mt-2'>
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination={true}
                            selectableRows
                        />
                    </div>
                    {
                        modal.key == "create" ?
                            <Modal open={modal.open} setOpen={() => { setModal({ ...modal, open: false }) }}>
                                <>
                                    <form onSubmit={save} className='p-4'>
                                        <Input label='Nama' placeholder='Masukkan Nama' name='nama' />
                                        <Input label='No Hp' placeholder='Masukkan No Hp' name='phone' />
                                        <Input label='Email' placeholder='Masukkan Email' name='email' />
                                        <Input label='Password' placeholder='Masukkan Password' name='password' />
                                        <p className='text-red-500 my-3'>
                                            {info}
                                        </p>
                                        <div className="bg-gray-50 w-full gap-2 py-3 sm:flex">
                                            <button
                                                className="mt-3 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600 sm:mt-0"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                                                onClick={() => setModal({ ...modal, open: false })}
                                            >
                                                Cancel
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