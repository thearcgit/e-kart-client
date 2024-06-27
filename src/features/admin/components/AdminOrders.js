import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE } from '../../../common/components/constant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectAllOrders, updateOrderAsync } from '../../orders/orderSlice';
import {  EyeIcon, PencilIcon,ArrowUpCircleIcon,ArrowDownCircleIcon,ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { updateCartAsync } from '../../cart/cartSlice';
import Pagination from '../../../common/components/Pagination';


const AdminOrders = () => {
  const dispatch = useDispatch()
  const allOrders = useSelector(selectAllOrders)
  const totalOrders = useSelector(state => state.orders.totalOrders)
  const [editOrderID, setEditOrderID] = useState(-1)
  const [sort, setSort] = useState({})

  const [page, setPage] = useState(1)

  const handleEdit = (order) => {
    setEditOrderID(order.id)
  }
  const handleShow = (order) => {
  }
  const handleStatus = (e, order) => {
    dispatch(updateOrderAsync({ ...order, status: e.target.value }))
    setEditOrderID(-1)
  }

  const handleSort = sortOption => {
    let sort = {_sort:sortOption.key, _order:sortOption.type}
    setSort(sort)
  }

  
  const handlePage = (page) => {
    setPage(page)
    
  }
  const statusColor = (status) => {
    switch (status) {
      case "dispatched":
        return `bg-yellow-200 text-black-800`
      case "delivered":
        return `bg-green-200 text-green-900`
      case "cancelled":
        return `bg-red-200 text-red-600`
      default:
        return `bg-blue-200 text-pink-600`

    }
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({sort, pagination}));
  }, [dispatch, page,sort]);
  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left cursor-pointer" onClick={e => handleSort({key:'id',type:sort._order ==="asc" ? "desc" : "asc" })}>ORDERS# {sort._sort === "id" && (sort._order === "asc" ? <ArrowDownCircleIcon className='w-6 inline'></ArrowDownCircleIcon> :<ArrowRightCircleIcon className='w-6 inline'></ArrowRightCircleIcon>)}</th>
                    <th className="py-3 px-6 text-left">ITEMS</th>
                    <th className="py-3 px-6 text-center cursor-pointer" onClick={e => handleSort({key:'totalAmount',type:sort._order ==="asc" ? "desc" : "asc" })}>TOTAL AMOUNT {sort._sort === "totalAmount" && (sort._order === "asc" ? <ArrowUpCircleIcon className='w-6 inline'></ArrowUpCircleIcon> :<ArrowDownCircleIcon className='w-6 inline'></ArrowDownCircleIcon>)}</th>
                    <th className="py-3 px-6 text-center">SHIPPING ADDRESS</th>
                    <th className="py-3 px-6 text-center">STATUS</th>
                    <th className="py-3 px-6 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {allOrders?.length > 0 ?
                    (allOrders.map((order, index) =>
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{index + 1}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order?.items.length && order.items.map(item =>
                            <div key={item?.id} className="flex items-center my-1">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item?.product?.thumbnail}
                                />
                              </div>
                              <span>{item?.product?.title} - {item?.quantity}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            $ {order?.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div>{order?.selectedAddress?.street}</div>
                          <div>{order?.selectedAddress?.city}</div>
                          <div>{order?.selectedAddress?.state}</div>
                          <div>{order?.selectedAddress?.country}</div>
                          <div>{order?.selectedAddress?.pinCode}</div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {
                            editOrderID === order.id ?
                              <select name="" id=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                onChange={(e) => handleStatus(e, order)}
                                value={order?.status}
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select> :

                              <span className={`${statusColor(order?.status)} py-1 px-3 rounded-full text-xs`}>
                                {order?.status}
                              </span>
                          }
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-6 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110"
                              onClick={() => handleShow(order)}
                            >
                              <EyeIcon />
                            </div>
                            <div
                              className="w-6 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110"
                              onClick={() => handleEdit(order)}
                            >
                              <PencilIcon />
                            </div>

                          </div>
                        </td>
                      </tr>
                    )) : <tr>
                      <td colSpan="6" className="py-3 px-6 text-center">No orders found</td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>



    </>
  )
}

export default AdminOrders
