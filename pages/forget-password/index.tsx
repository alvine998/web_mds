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
            const payload = {
                ...formdata
            }
            console.log(payload);
            Swal.fire({
                text: "Berhasil Mengirimkan Kode",
                icon: "success"
            })
            navigate.push(`verification-code?email=${formdata?.email}`)
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

    }, [loading])
    return (
        <Fragment>
            <Head>
                <title>Lupa Password</title>
            </Head>
            <div className='w-full h-[100vh] bg-green-400 md:p-56'>
                <p className='text-white text-center font-sans text-lg'>
                    Kami akan mengirimkan kode verifikasi melalui email yang terdaftar.
                </p>
                <div className='bg-white w-[400px] h-[200px] rounded-lg mx-auto mt-5'>
                    <div className='md:px-5 md:py-2'>
                        <form onSubmit={sendCode}>
                            <div className='w-full mt-2'>
                                <label htmlFor="email" className='text-gray-400'>Email</label>
                                <input type="email" name='email' id='email' placeholder='user@domain.com' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300 rounded-md pl-2 w-full p-1' />
                            </div>
                            <div className='w-full mt-5'>
                                <button type='submit' disabled={loading.status == true ? true : false} className='text-white bg-blue-500 hover:bg-blue-600 h-8 w-full rounded-md transition duration-300'>
                                    {loading.status == false ? "Kirim Kode" : "Mengirim..."}
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
