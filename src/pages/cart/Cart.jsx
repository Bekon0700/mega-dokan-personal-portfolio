import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import CartCard from '../../components/cart-card/CartCard'
import { authContext } from '../../context/AuthProvider'
import { cartContext } from '../../context/CartProvider'

const Cart = () => {
    const { user } = useContext(authContext)
    const { cart, totalPrice, cartClrHandler } = useContext(cartContext)
    const totalBill = totalPrice + 5

    const [paymentStatus, setPaymentStatus] = useState(false)
    const [successStatus, setSuccessStatus] = useState('')
    const [error, setError] = useState('')

    const { data: paymentSecret } = useQuery({
        queryKey: ['payment-secret', totalBill],
        queryFn: async () => {
            const res = await axios.post('https://inventory-rest-api.vercel.app/create-payment-intent', {
                totalBill
            })
            return res.data
        }
    })
    // console.log(paymentSecret)

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user.displayName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
            }
        });

        if (error) {
            setError(error.message)
        }

        setPaymentStatus(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            paymentSecret.client_secret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName || '',
                        email: user.email || '',
                        phone: user.phoneNumber || '',
                    }
                },
            },
        );

        if(paymentIntent?.status == 'succeeded'){
            setSuccessStatus(paymentIntent.id)
            toast.success('payment successful')
            setError('')
            console.log(successStatus)
        }else{
            setError(confirmError.message)
            console.log(confirmError)
            setSuccessStatus('')
        }
        setPaymentStatus(false)

        card.clear()
    }

    if (cart.length == 0) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-lg font-medium'>Please add some items to the cart first!</p>
            </div>
        )
    }

    return (
        <div className='w-11/12 lg:w-5/6 mx-auto py-6 min-h-screen'>
            <div className='py-8 grid grid-cols-12 gap-10 lg:gap-0'>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-semibold text-gray-900'>Shopping Cart</p>
                        <p className='text-xl font-medium '>Items {cart?.length}</p>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-12 uppercase text-xs lg:text-sm'>
                        <p className='col-span-8'>Product details</p>
                        <p className='col-span-2 text-center'>Quantity</p>
                        <p className='col-span-2 text-center'>Discount price</p>
                    </div>
                    <div className='flex flex-col gap-8 mt-6'>
                        {
                            cart.map(el => <CartCard key={el._id} product={el} delOpt={true} />)
                        }
                    </div>
                    {
                        !cart.length ?
                            <p className='text-center text-2xl font-semibold py-12'>No Item in the cart</p>
                            :
                            <div className='flex flex-col gap-4 justify-center pt-8'>
                                <button onClick={cartClrHandler} className='bg-red-800 py-2 text-base lg:text-base font-medium uppercase text-white w-full rounded-md text-center'>Clear Cart</button>
                            </div>
                    }
                </div>

                <div className='col-span-12 lg:col-span-4 lg:w-3/5 lg:mx-auto'>
                    <p className='text-2xl font-semibold text-gray-900'>Order Summary</p>
                    <div className="divider"></div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium '>Total Items</p>
                            <p className='text-base font-medium'>{cart?.length}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Total price</p>
                            <p className='text-base font-medium'>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Shipping Charge</p>
                            <p className='text-base font-medium'>$5.00</p>
                        </div>
                        <div className='flex justify-between items-center mt-8 pt-2 border-t border-gray-600'>
                            <p className='text-base font-medium'>Total Bill</p>
                            <p className='text-base font-bold'>${totalBill.toFixed(2)}</p>
                        </div>
                        {/* The button to open modal */}
                        {
                            user ?
                                <label htmlFor="my-modal" className='bg-blue-700 py-2 text-sm lg:text-base uppercase font-medium text-white w-full rounded-sm text-center cursor-pointer'>Click here to proceed</label>
                                :
                                <Link to='/login' state={{ from: `${location.pathname}` }} className='bg-gray-800 py-2 text-sm lg:text-sm uppercase font-medium text-white w-full rounded-sm text-center cursor-pointer'>Please Sign in to process payment</Link>
                        }
                    </div>
                </div>
            </div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='flex justify-between items-center'>
                        <p className='text-base font-bold'>Pay ${totalBill.toFixed(2)}</p>
                        <label htmlFor="my-modal" onClick={cartClrHandler} className="bg-red-700 text-white px-2 py-1 rounded-md text-sm font-bold">X</label>
                    </div>
                    <p className='py-4 text-sm text-gray-500'>Please fill in your information carefully</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 border py-4 px-2'>
                        <input type="text" value={user.displayName || 'name'} disabled className='text-base text-gray-400 cursor-no-drop' />
                        <input type="text" value={user.email || 'email'} disabled className='text-base text-gray-400 cursor-no-drop' />
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button type="submit" disabled={!stripe} className={paymentStatus ? 'px-4 py-1 bg-gray-800 text-white cursor-wait' : 'px-4 py-1 bg-gray-800 text-white'}>
                            Pay
                        </button>
                        {
                            error && <p className='text-center text-sm font-medium text-red-500'>{error}</p>
                        }
                        {
                            successStatus && <p className='text-left text-sm font-normal text-green-700'>Payment Success <br/>Transection Id: <span >{successStatus}</span></p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cart