import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react'

export default function Sidebar() {
    const route = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    const navigations = [
        {
            name: "Beranda",
            href: "dashboard",
            active: route?.pathname?.includes('dashboard')
        },
        {
            name: "Data User",
            href: "user",
            active: route?.pathname?.includes('user')
        },
        {
            name: "Data Pelanggan",
            href: "customer",
            active: route?.pathname?.includes('customer')
        },
        {
            name: "Pengaturan",
            href: "setting",
            active: route?.pathname?.includes('setting'),
            children: [
                {
                    name: "Akun",
                    href: "setting/account"
                },
                {
                    name: "Keluar",
                    href: "/login"
                },
            ]
        },
    ]

    return (
        <div className='bg-blue-500 w-[300px] h-[100vh]'>
            <div className='flex flex-col items-center'>
                {/* Brand Name */}
                <a className='text-yellow-500 text-2xl mt-5 font-bold font-sans' href="dashboard">
                    Midland Sales Force
                </a>
            </div>
            {/* List Sidebar */}
            <div className='mt-10'>
                {
                    navigations?.map((v: any, i: number) => (
                        <Fragment key={i}>
                            {
                                v?.children?.length > 0 ? <>
                                    <div className={`hover:bg-blue-600 ${v?.active == true ? 'bg-blue-600' : ''} w-full h-10 transition duration-300 pt-1 flex justify-between cursor-pointer`} onClick={() => { setIsOpen(!isOpen) }}>
                                        <p className='text-white text-lg ml-5 transition delay-150 hover:translate-x-2'>{v?.name}</p>

                                    </div>
                                    {
                                        isOpen ?
                                            <>
                                                {
                                                    v?.children?.map((val: any, idx: number) => (
                                                        <Link key={idx} href={val?.href}>
                                                            <div className={`hover:bg-blue-600 w-full h-10 transition-all transform ${isOpen ? 'max-h-96' : 'max-h-0'} duration-300 pt-1`}>
                                                                <p className='text-white text-lg ml-8 transition delay-150 ease-in-out hover:translate-x-2'>{val?.name}</p>
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </> : ""
                                    }
                                </> : <>
                                    <Link href={v?.href}>
                                        <div className={`hover:bg-blue-600 ${v?.active == true ? 'bg-blue-600' : ''} w-full h-10 transition duration-300 pt-1`}>
                                            <p className='text-white text-lg ml-5 transition delay-150 hover:translate-x-2'>{v?.name}</p>
                                        </div>
                                    </Link>
                                </>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}
