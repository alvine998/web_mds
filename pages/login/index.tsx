import { logo } from '@/assets'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'

export default function Login() {
    const [loading, setLoading] = useState<any>({
        status: false,
        message: ""
    })

    const navigate = useRouter()

    const login = async (e: any) => {
        e.preventDefault()
        setLoading({ status: true })
        try {
            const formdata: any = Object.fromEntries(new FormData(e.target))
            if (formdata?.password.length < 8) {
                setLoading({ status: false, message: "Password tidak boleh kurang dari 8 karakter" })
                return
            } const payload = {
                ...formdata
            }
            setLoading({ status: false })
            navigate.push('main/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (loading?.message) {
            setTimeout(() => {
                setLoading({
                    message: ""
                })
            }, 3000);
        }
    }, [loading])
    return (
        <Fragment>
            <Head>
                <title>Login</title>
            </Head>
            <div className='md:flex'>
                <div className='bg-slate-50 w-full h-[100vh] flex justify-center items-center'>
                    <Image alt='logo-midland' src={logo} width={250} height={400} />
                </div>
                <div className='bg-green-400 w-full h-[100vh] flex flex-col justify-center items-center'>
                    <h1 className='text-white text-2xl font-sans font-bold'>Midland Sales Forces</h1>
                    <div className='md:px-10 md:mt-10'>
                        <div className='w-[350px] flex flex-col justify-center items-center border border-white rounded-lg h-full hover:border-gray-200 duration-300 transition md:p-5'>
                            <h1 className='text-white font-sans font-bold text-lg'>LOGIN</h1>
                            <form onSubmit={login}>
                                <div className='w-full mt-2'>
                                    <label htmlFor="email" className='text-white'>Email</label>
                                    <input type="email" name='email' id='email' placeholder='user@domain.com' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-md pl-2 w-full p-1' />
                                </div>
                                <div className='w-full mt-2'>
                                    <label htmlFor="password" className='text-white'>Password</label>
                                    <input type="password" name='password' id='password' placeholder='*******' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-md pl-2 w-full p-1' />
                                    <div className='flex justify-end mt-1'>
                                        <Link href={'forget-password'}>
                                            <p className='text-white text-xs hover:text-red-400 duration-300 transition'>Lupa Password?</p>
                                        </Link>
                                    </div>
                                </div>
                                {
                                    loading?.message ?
                                        <p className='text-xs text-red-500 mt-2'>{loading?.message}</p> : ""
                                }
                                <div className='w-full mt-5'>
                                    <button type='submit' disabled={loading.status == true && true} className='text-white bg-blue-500 hover:bg-blue-600 h-8 w-full rounded-md transition duration-300'>
                                        {loading.status == false ? "Masuk" : "Menunggu..."}
                                    </button>
                                    <button onClick={() => { navigate.push('https://midlandproperti.com') }} type='button' className='text-white bg-orange-500 hover:bg-orange-600 h-8 w-full rounded-md transition duration-300 mt-2'>
                                        Kembali
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
