import Head from 'next/head';
import React from 'react'
import Sidebar from './Sidebar';

type Props = {
    title: string;
    children: any;
}

export default function Layout(props: Props) {
    const { title, children } = props
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className='flex'>
                <div>
                    <Sidebar/>
                </div>
                <div className='bg-slate-100 h-[100vh] w-full p-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}
