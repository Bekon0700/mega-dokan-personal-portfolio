import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../../components/form-input/FormInput'
import { authContext } from '../../context/AuthProvider'
const formData = [
    {
        id: 1,
        name: 'email',
        placeholder: 'john@doe.com',
        type: 'text'
    },
    {
        id: 2,
        name: 'password',
        placeholder: 'password',
        type: 'password'
    },
]

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location)
    const {userLogin, googleLogin} = useContext(authContext)
    const path = location?.state?.from || '/'
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        try{
            await userLogin(email, password)
            form.reset()
            navigate(path, {replace: true})
        }catch(err){
            console.error(err.message)
        }
    }

    const googleHandler = async () =>{
        await googleLogin()
        navigate(path, {replace: true})
    }

    return (
        <div className='flex justify-center py-12 lg:py-24'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-900 border border-gray-700">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    {
                        formData.map(el => <FormInput key={el.id} data={el} />)
                    }
                    <button className="block w-full p-3 text-center font-semibold text-lg rounded-sm text-gray-900 bg-violet-400">Sign in</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-base text-gray-800 font-semibold">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={googleHandler} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 font-semibold">Don't have an account?
                    <Link to='/register' className="pl-1 underline text-blue-900">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login