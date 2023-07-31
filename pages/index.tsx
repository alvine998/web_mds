import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Fragment, useEffect, useState, useTransition } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { CONFIG } from '@/config'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [char, setChar] = useState<number>()
  const [loading, setLoading] = useState<any>({
    status: false,
    message: ""
  })

  const navigate = useRouter()

  const sendingMessage = async (e: any) => {
    setLoading({ status: true })
    e?.preventDefault();
    const formData: any = Object.fromEntries(new FormData(e.target))
    let phone = null
    if (formData?.phone?.toString()?.substring(0, 1) == '0') {
      phone = formData?.phone?.toString()?.slice(1)
    }
    if (formData?.phone?.toString()?.substring(0, 2) == '62') {
      phone = formData?.phone?.toString()?.slice(2)
    }
    if (formData?.phone?.toString()?.substring(0, 3) == '+62') {
      phone = formData?.phone?.toString()?.slice(3)
    }
    if (formData?.phone?.toString()?.includes("-")) {
      phone = formData?.phone?.toString()?.replace(/-/g, "")
    }
    try {
      const payload = {
        ...formData,
        phone: phone,
        status: 'waiting'
      }
      const result = await axios.post(CONFIG.base_url.api + `/customer`, payload, {
        headers: {
          'bearer-token': 'serversalesproperties2023'
        }
      })
      setTimeout(() => {
        setLoading({ status: false })
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loading.status == true) {
      setChar(4)
      setInterval(() => {
        setChar((prev: any) => prev - 1)
      }, 1000)
    }
  }, [loading])

  return (
    <Fragment>
      <Head>
        <title>Kirim Sekarang</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className='bg-blue-200 p-2 w-[600px] md:h-[70vh] h-[100vh] mx-auto my-20 rounded-lg'>
        <div>
          <h1 className='text-center text-black font-sans font-bold text-2xl mt-5'>KIRIM PESAN</h1>
          {
            loading.status == true ? <>
              <div className='flex flex-col items-center justify-center mt-20'>
                <button type="button" className="bg-green-500 p-5 rounded-full animate-bounce text-white" disabled>
                  Loading...
                </button>
                <p className='text-lg text-center text-black'>
                  Mohon menunggu sales kami akan menghubungi anda dalam {char} detik
                </p>
              </div>
            </>
              : <>
                <form onSubmit={sendingMessage} className='flex flex-col items-center mt-10 md:mx-20 mx-10'>
                  <div className='w-full'>
                    <label htmlFor="name" className='text-gray-500'>Nama</label>
                    <input type="text" name='name' id='name' placeholder='Masukkan nama anda' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md pl-2 w-full p-1' />
                  </div>
                  <div className='w-full mt-2'>
                    <label htmlFor="phone" className='text-gray-500'>No Hp (Pastikan terhubung ke Whatsapp)</label>
                    <input type="text" name='phone' id='phone' placeholder='08xxxxxx' maxLength={13} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md pl-2 w-full p-1' />
                  </div>
                  <div className='w-full mt-2'>
                    <label htmlFor="email" className='text-gray-500'>Email</label>
                    <input type="email" name='email' id='email' placeholder='Masukkan alamat email anda' maxLength={100} required className='focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md pl-2 w-full p-1' />
                  </div>

                  <div className='w-full mt-5'>
                    <button type='submit' disabled={loading.status == true && true} className='text-white bg-blue-500 hover:bg-blue-600 h-10 w-full rounded-md transition duration-300'>
                      {loading.status == false ? "Kirim" : "Mengirim..."}
                    </button>
                    <button onClick={() => { navigate.push('https://midlandproperti.com') }} type='button' className='text-white bg-orange-500 hover:bg-orange-600 h-10 w-full rounded-md transition duration-300 mt-2'>
                      Kembali
                    </button>
                  </div>
                </form>
              </>
          }
        </div>
      </div>
    </Fragment>
  )
}
