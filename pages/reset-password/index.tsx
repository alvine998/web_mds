import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function ForgetPass() {
    const [loading, setLoading] = useState<any>({
        status: false,
        message: "",
    })

    const sendCode = async (e: any) => {
        e.preventDefault()
        setLoading({ status: true })
        try {
            const formdata: any = Object.fromEntries(new FormData(e.target))
            if (formdata?.password.length < 8 || formdata?.confirm_password.length < 8) {
                setLoading({ loading: false, message: "Password tidak boleh kurang dari 8 karakter" })
                return
            }
            if (formdata?.password !== formdata?.confirm_password) {
                setLoading({ loading: false, message: "Password tidak sama" })
                return
            }
            const payload = {
                ...formdata
            }
            console.log(payload);
            Swal.fire({
                text: "Berhasil Mengirimkan Kode",
                icon: "success"
            })
            setLoading({loading: false})
            navigate.push(`login`)
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Mengirimkan Kode",
                icon: "error"
            })
        }
    }

    const navigate = useRouter()

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
                <title>Reset Password</title>
            </Head>
            <div className='w-full h-[100vh] bg-green-400 md:p-56'>
                <p className='text-white text-center font-sans text-lg'>
                    Atur ulang password anda dengan password terbaru
                </p>
                <div className='bg-white w-[400px] h-[270px] rounded-lg mx-auto mt-5'>
                    <div className='md:px-5 md:py-2'>
                        <form onSubmit={sendCode}>
                            <div className='w-full mt-2'>
                                <label htmlFor="password" className='text-gray-400'>Password Baru</label>
                                <input type="password" name='password' id='password' placeholder='*******' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300 rounded-md pl-2 w-full p-1' />
                            </div>
                            <div className='w-full mt-2'>
                                <label htmlFor="confirm_password" className='text-gray-400'>Konfirmasi Password Baru</label>
                                <input type="password" name='confirm_password' id='confirm_password' placeholder='*******' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300 rounded-md pl-2 w-full p-1' />
                            </div>
                            {
                                loading?.message ?
                                    <p className='text-xs text-red-500'>{loading?.message}</p> : ""
                            }
                            <div className='w-full mt-5'>
                                <button type='submit' disabled={loading.status == true ? true : false} className='text-white bg-blue-500 hover:bg-blue-600 h-8 w-full rounded-md transition duration-300'>
                                    {loading.status == false ? "Simpan" : "Menyimpan..."}
                                </button>
                                <button onClick={() => { navigate.push('login') }} type='button' className='text-white bg-orange-500 hover:bg-orange-600 h-8 w-full rounded-md transition duration-300 mt-2'>
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
