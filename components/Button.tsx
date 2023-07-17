import React, { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string,
    color?: 'primary' | 'success' | 'warning' | 'info' | 'light'
}

export default function Button(props: Props) {
    const { label, color } = props
    let className: string = ''
    color == 'primary' ?
        className = 'w-full p-1 bg-blue-500 transition duration-300 hover:bg-blue-600 text-white rounded-md' :
        color == 'success' ?
            className = 'w-full p-1 bg-green-500 transition duration-300 hover:bg-green-600 text-white rounded-md' :
            color == 'warning' ?
                className = 'w-full p-1 bg-yellow-500 transition duration-300 hover:bg-yellow-600 text-black rounded-md' :
                color == 'info' ?
                    className = 'w-full p-1 bg-orange-500 transition duration-300 hover:bg-orange-600 text-white rounded-md' :
                    color == 'light' ?
                        className = 'w-full p-1 bg-gray-500 transition duration-300 hover:bg-gray-600 text-white rounded-md' :
                        className = 'w-full p-1 bg-blue-500 transition duration-300 hover:bg-blue-600 text-white rounded-md'
    return (
        <div className='mt-2'>
            <button
                {...props}
                className={className}
            >
                {label}
            </button>
        </div>
    )
}
