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
        const result = await axios.get(process.env.URL_API + `/customers?search=${search || ""}`, {
            headers: {
                'bearer-token': 'serversalesproperties2023',
                'x-app-id': 'id.app.midland'
            }
        })
        return {
            props: {
                customers: result?.data?.items || [],
                uri: process.env.URL_API
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function Dashboard({ customers, uri }: { customers: any, uri: string }) {
    const [modal, setModal] = useState<any>({
        open: false,
        data: null,
        key: ""
    })
    const [info, setInfo] = useState('')
    const router: any = useRouter();
    const [filter, setFilter] = useState<any>(router.query)
    const [showTable, setShowTable] = useState<boolean>(false);

    const columns: any = [
        {
            name: "Nama",
            selector: (row: Customers) => row?.name
        },
        {
            name: "Email",
            selector: (row: Customers) => row?.email
        },
        {
            name: "No HP",
            selector: (row: Customers) => row?.phone
        },
        {
            name: "Status",
            selector: (row: Customers) => row?.status
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
                    <h1 className='font-bold text-xl underline'>DATA PELANGGAN</h1>
                    <div className='w-full md:mt-10 flex justify-between items-center'>
                        <Button label='Print' style={{ width: 100 }} />
                        <Input placeholder='Cari' name='search' defaultValue={filter?.search || ""} onChange={(e: any) => { setFilter({ ...filter, search: e.target.value }) }} />
                    </div>
                    <div className='mt-2'>
                        {
                            showTable ?
                                <DataTable
                                    columns={columns}
                                    data={customers}
                                    pagination={true}
                                    selectableRows
                                /> : ""
                        }
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}