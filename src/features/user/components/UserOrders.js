import React, { useEffect, useState } from 'react'
import { fetchUserOrdersAsync, selectUserOrders } from '../userSlice'
import { useSelector, useDispatch } from "react-redux"

const UserOrders = () => {
  const userId = useSelector(state => state.auth.loggedInUser.id)
  const orders = useSelector(selectUserOrders)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('user order res useEffect')

    dispatch((fetchUserOrdersAsync(userId)))
  }, [userId])
  return (
    <>
      {orders && orders.length && orders.map((order, i) =>
        <div className="mx-auto mt-12 bg-white max-w-7xl my-3 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 my-5">
              Order # {i + 1}
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-red-900 my-5">
              Order Status : {order?.status}
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items && order.items.length && order.items.map(items => (
                  <li key={items?.id} className="flex py-6">

                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={items?.thumbnail}
                        alt={items?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={items?.href}>{items?.title}</a>
                          </h3>
                          <p className="ml-4">${items?.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {items?.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty: {items?.quantity}
                          </label>

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
              <p>Total Value</p>
              <p>$ {order?.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items </p>
              <p>{order?.totalItems} {order?.totalItems === 1 ? `item` : `items`}</p>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Shipping Address:
            </p>
            <div className="flex justify-between px-4 gap-x-6 py-5 border-solid border-2 border-gray-200">
              <div className="flex min-w-0 gap-x-4">
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address?.imageUrl} alt="" /> */}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{order?.selectedAddress?.firstName} {order?.selectedAddress?.lastName} </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAddress?.email} </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">Phone: {order?.selectedAddress?.phone}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                {/* <p className="text-sm leading-6 text-gray-900">{order?.selectedAddress?.role}</p> */}
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAddress?.street}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAddress?.city}, {order?.selectedAddress?.state}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">pin: {order?.selectedAddress?.pinCode}</p>
                {/* <span> <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAddress?.state}</p></span> */}

              </div>
            </div>
          </div>

        </div>
      )}

    </>
  )
}

export default UserOrders
