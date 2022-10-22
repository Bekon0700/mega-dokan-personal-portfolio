import React from 'react'

const FormInput = ({data}) => {
    const {name, placeholder, type} = data
    return (
        <div className="space-y-1 text-base">
            <label htmlFor={name} className="block text-gray-600">{name}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} className="w-full px-4 py-3 rounded-md border border-gray-800 text-gray-900 focus:border-violet-400" />
        </div>
    )
}

export default FormInput