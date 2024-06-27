import React, { useEffect, useState } from 'react'
import { fetchLoggedInUserAsync, fetchUserOrdersAsync, selectUserInfo, updateUserAsync, } from '../userSlice'
import { useSelector, useDispatch } from "react-redux"
import { deleteItemFromCartAsync } from '../../cart/cartSlice'
import { useForm } from 'react-hook-form'

const UserProfile = () => {
  const [editSelectedAddress, setEditSelectedAddress] = useState(-1)
  const [addNewAddress, setAddNewAddress] = useState(false)
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, reset, getValues, formState: { errors } } = useForm()
  const handleEdit = (e, index) => {
    setEditSelectedAddress(index)
    setValue("firstName", user.addresses[index].firstName || "")
    setValue("lastName", user.addresses[index].lastName || "")
    setValue("email", user.addresses[index].email || "")
    setValue("country", user.addresses[index].country || "")
    setValue("phone", user.addresses[index].phone || "")
    setValue("street", user.addresses[index].street || "")
    setValue("city", user.addresses[index].city || "")
    setValue("state", user.addresses[index].state || "")
    setValue("pinCode", user.addresses[index].pinCode || "")

  }
  const handleDelete = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))

  }
  const handleForm = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(editSelectedAddress, 1, data)
    dispatch(updateUserAsync(newUser))
    setEditSelectedAddress(-1)
    reset()
  }
  const handleAddAddressForm = (data) => {
    const newUser = { ...user, addresses: [...user.addresses,data] }
    dispatch(updateUserAsync(newUser))
    setAddNewAddress(false)
    reset()
  }

  return (
    <>
      <div className="mx-auto mt-12 bg-white max-w-7xl my-3 px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 my-5">
            Name:{user?.firstName || " User Name"} {user?.lastName}
          </h1>
          <h1 className="text-xl font-bold tracking-tight text-red-900 my-5">
            Email: {user?.email}
          </h1>
          {user?.role === "admin" && <h1 className="text-xl font-bold tracking-tight text-red-900 my-5">
            Role: {user?.role}
          </h1>}
        </div>
          <button
            type="submit"
            onClick={() => setAddNewAddress(true)}
            className="rounded-md bg-green-600 px-3 mb-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button>
        {addNewAddress &&
          <form noValidate className='bg-white p-3 mt-12' onSubmit={handleSubmit(handleAddAddressForm)}>
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
                  <button
                    type="submit"
                    onClick={() => setAddNewAddress(false)}
                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>

            </div>


          </form>
        }

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Addresses:
          </p>
          {user && user?.addresses?.length && user.addresses.map((address, index) =>
            <>
              <div key={index}>
                {editSelectedAddress === index &&
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
                          <button
                            type="submit"
                            onClick={() => setEditSelectedAddress(-1)}
                            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>

                    </div>


                  </form>
                }

                <div className="flex my-2 px-4 gap-x-6 py-5 border-solid border-2 border-gray-200">
                  <div className='flex justify-between  flex-grow my-2  '>
                    <div className="flex min-w-0 gap-x-4">
                      {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address?.imageUrl} alt="" /> */}
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address?.firstName} {address?.lastName} </p>
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
                  </div>

                  <div className="flex flex-col mx-2  mt-1">
                    <button
                      onClick={(e) => handleEdit(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 my-3 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </>

          )}
        </div>

      </div>


    </>
  )
}

export default UserProfile

