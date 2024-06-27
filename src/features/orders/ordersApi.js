// A mock function to mimic making an async request for data
import axios from "axios";


export function createOrder(order) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.post(`/orders`, order, {
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
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  return new Promise(async (resolve) => {
    try {

      let res = await axios.get(`/orders/admin/?${queryString}`, {
        headers: { "Content-Type": "application/json" }
      })
      let orders = res.data

      // Filter for Pagination..............
      // if (Object.keys(sort).length > 0) {
      //   orders.sort((a, b) => {
      //     if (sort._sort === "totalAmount") {
      //       if (sort._order === "asc") return a.totalAmount - b.totalAmount
      //       else return b.totalAmount - a.totalAmount
      //     }
      //   })


      // }
      orders = res.data;
      let totalOrders = res?.headers.get("X-Total-Count");

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

      let res = await axios.patch(`/orders/${order.id}`, order, {
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
