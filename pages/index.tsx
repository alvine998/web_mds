import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Fragment, useState, useTransition } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [char, setChar] = useState<number>(0)
  const [loading, setLoading] = useState<any>({
    status: false,
    message: ""
  })

  const navigate = useRouter()

  return (
    <Fragment>
      <Head>
        <title>Send Me</title>
      </Head>
      <div className='bg-blue-200 p-2 w-[600px] md:h-[70vh] h-[100vh] mx-auto my-20 rounded-lg'>
        <div>
          <h1 className='text-center text-black font-sans font-bold text-2xl mt-5'>KIRIM PESAN</h1>
          <form className='flex flex-col items-center mt-10 md:mx-20 mx-10'>
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
        </div>
      </div>
    </Fragment>
  )
}
