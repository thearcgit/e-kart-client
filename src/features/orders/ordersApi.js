// A mock function to mimic making an async request for data
import axios from "axios";


export function createOrder(order) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.post(`http://localhost:8080/orders`, order, {
        headers: { "Content-Type": "application/json" }
      })

      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
export function fetchAllOrders(sort, pagination) {

  let queryString = "";
  // for(let key in pagination){
  //   queryString += `${key}=${pagination[key]}&`
  // }

  const { _limit, _page } = pagination
  return new Promise(async (resolve) => {
    try {

      let res = await axios.get(`http://localhost:8080/orders/?${queryString}`, {
        headers: { "Content-Type": "application/json" }
      })
      let orders = res.data

      // Filter for Pagination..............
      if (Object.keys(sort).length > 0) {
        orders.sort((a, b) => {
          if (sort._sort === "totalAmount") {
            if (sort._order === "asc") return a.totalAmount - b.totalAmount
            else return b.totalAmount - a.totalAmount
          }
        })


      }
      orders = res.data.slice((_page - 1) * _limit, _page * _limit);
      let totalOrders = res?.data.length

      resolve({ orders: orders, totalOrders: +totalOrders });

    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
export function updateOrder(order) {

  return new Promise(async (resolve) => {
    try {

      let res = await axios.patch(`http://localhost:8080/orders/${order.id}`, order, {
        headers: { "Content-Type": "application/json" }
      })

      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
