import Button from '@/components/Button'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { CONFIG } from '@/config'
import axios from 'axios'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'

import React, { Fragment, useState } from 'react'
import firebase_app, { db } from '@/config/firebase'
import Input from '@/components/Input'
import Swal from 'sweetalert2'

const auth = getAuth(firebase_app);

export const getServerSideProps = async (context: any) => {
    try {
        // const users = await (
        //     await axios.get(CONFIG.base_url.api + `/users`, {
        //         headers: {
        //             'bearer-token': 'serversalesproperties2023',
        //             'x-app-id': 'id.app.midland'
        //         }
        //     })
        // )
        return {
            props: {
                // users: users.data.items || null,
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

    const save = async (e: any) => {
        e?.preventDefault();
        const formdata: any = Object.fromEntries(new FormData(e.target))
        try {
            const payload = {
                ...formdata,
            }
            const addRef = await addDoc(collection(db, "users"), payload)
            const result = await createUserWithEmailAndPassword(auth, formdata?.email, formdata?.password);
            if (result && addRef) {
                Swal.fire({
                    text: "Berhasil Simpan Data",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Simpan Data",
                icon: "error"
            })
        }
    }

    return (
        <Fragment>
            <Layout title='Dashboard'>
                <div>
                    <h1>User</h1>
                    <div className='w-1/6'>
                        <Button onClick={() => {
                            setModal({ ...modal, open: true, data: null, key: "create" })
                        }} label='Buat User' />
                    </div>
                    <div>
                        <table className='w-full mt-2 rounded-lg'>
                            <thead className='border border-gray-500'>
                                <tr>
                                    <th className='border border-gray-500'>No</th>
                                    <th className='border border-gray-500'>Nama</th>
                                    <th className='border border-gray-500'>Email</th>
                                    <th className='border border-gray-500'>No Hp</th>
                                    <th className='border border-gray-500'>Peran</th>
                                    <th className='border border-gray-500'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {
                        modal.key == "create" ?
                            <Modal open={modal.open} setOpen={() => { setModal({ ...modal, open: false }) }}>
                                <>
                                    <form onSubmit={save} className='px-2'>
                                        <Input label='Nama' placeholder='Masukkan Nama' name='nama' />
                                        <Input label='No Hp' placeholder='Masukkan No Hp' name='phone' />
                                        <Input label='Email' placeholder='Masukkan Email' name='email' />
                                        <Input label='Password' placeholder='Masukkan Password' name='password' />
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