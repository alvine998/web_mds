import React, { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    isRequired?: boolean
}

export default function Input(props: Props) {
    const { label, isRequired } = props
    return (
        <div className='mt-2'>
            {
                label ?
                    <label
                        htmlFor={props.id}
                        className="block text-sm font-medium text-gray-500"
                    >
                        {label} {isRequired ? <span className="text-xs text-orange-600 italic">*</span> : ""}
                    </label> : ""
            }
            <input
                {...props}
                required={isRequired && true}
                className='w-full h-auto focus:outline-none focus:ring-1 focus:ring-blue-400 p-1 rounded-md ring-1 ring-blue-300 mt-1 pl-2'
            />
        </div>
    )
}
