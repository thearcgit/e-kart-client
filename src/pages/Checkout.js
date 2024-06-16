import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {   selectCount, } from './cartSlice';
// import { Fragment, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { deleteItemFromCartAsync, updateCartAsync } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { createOrderAsync } from "../features/orders/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";



const Checkout = () => {

    const [open, setOpen] = useState(true);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const user = useSelector(selectUserInfo);
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const [selectedAddress, setSelectedAddress] = useState(user.addresses.length > 0 ? user.addresses[0] : null)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const dispatch = useDispatch();
    const totalAmount = cartItems.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0);

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: + e.target.value,product:item.product.id,user:item.user.id }))
    }

    const handleDelete = (item) => {

        dispatch(deleteItemFromCartAsync(item))
    }

    const handleForm = (data) => {
        dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
        reset()
    }

    const handleAddress = e => {
        setSelectedAddress(user.addresses[e.target.value])
    }
    const handlePayment = e => {
        setPaymentMethod(e.target.value)
    }
    const handleOrder = e => {
        if (!selectedAddress) return alert('Please select an address')
        let order = { items: cartItems, totalAmount, totalItems, user:user.id, paymentMethod, selectedAddress, status: "Pending" }
        dispatch(createOrderAsync(order))
        // TODO:Navigate to success page
        // TODO:Clear cart 
        // TODO:On server change the number of stock of items      


    }


    return (
        <>
            {!cartItems.length && <Navigate to="/" replace={true} />}
            {currentOrder && <Navigate to={`/order-success/${currentOrder?.id}`} replace={true} />}

            {cartItems.length > 0 && <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3'>

                        <form noValidate className='bg-white p-3 mt-12' onSubmit={handleSubmit(handleForm)}>
                            <div className="space-y-12">


                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-xl py-2 font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("firstName", { required: "First name is required." })}
                                                    id="firstName"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("lastName", { required: "Last name is required." })}
                                                    id="lastName"
                                                    autoComplete="lastName"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", { required: "Email is required." })}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register("country", { required: "Country is required." })}
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>India</option>
                                                    <option>United States</option>
                                                    <option>Pakistan</option>
                                                    <option>China</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register("phone", { required: "Phone is required." })}
                                                    id="phone"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("street", { required: "Street is required." })}
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", { required: "City is required." })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("state", { required: "State is required." })}
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Pin code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("pinCode", { required: "Pin code is required." })}
                                                    id="pinCode"
                                                    autoComplete="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing addresses
                                    </p>
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {user.addresses && user.addresses.length && user?.addresses.map((address, i) => (
                                            <li key={`${address?.email}${i}`} className="flex justify-between px-4 gap-x-6 py-5 border-solid border-2 border-gray-200">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id={address?.email}
                                                            name="address"
                                                            type="radio"
                                                            onChange={handleAddress}
                                                            value={i}
                                                            checked={address === selectedAddress}
                                                            className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        {/* <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label> */}
                                                    </div>
                                                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address?.imageUrl} alt="" /> */}
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName} {address.lastName} </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.email} </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Phone: {address?.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    {/* <p className="text-sm leading-6 text-gray-900">{address?.role}</p> */}
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.street}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.city}, {address?.state}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">pin: {address?.pinCode}</p>
                                                    {/* <span> <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.state}</p></span> */}

                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3 ">
                                                    <input
                                                        id="cash"
                                                        name="payment"
                                                        type="radio"
                                                        onChange={handlePayment}
                                                        value="cash"
                                                        checked={paymentMethod === "cash"}
                                                        className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3 ">
                                                    <input
                                                        id="card"
                                                        name="payment"
                                                        type="radio"
                                                        onChange={handlePayment}
                                                        value="card"
                                                        checked={paymentMethod === "card"}
                                                        className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                        No push notifications
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div className='lg:col-span-2'>
                        <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-2">
                            <div className="border-t border-gray-200 px-0 py-0 sm:px-6">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 my-5">
                                    Cart
                                </h1>
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item?.product?.thumbnail}
                                                        alt={item?.product?.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item?.product?.href}>{item?.product?.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${item?.product?.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {item?.product?.color}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label
                                                                htmlFor="quantity"
                                                                className="inline text-sm font-medium leading-6 text-gray-900"
                                                            >
                                                                Qty
                                                            </label>
                                                            <select id={`quantity-${item.id}`} className="mx-2" onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={() => handleDelete(item)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$ {totalAmount}</p>
                                </div>
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total Items in Cart</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{" "}
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >}
        </>
    )
}

export default Checkout
