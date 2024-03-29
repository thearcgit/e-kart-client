// A mock function to mimic making an async request for data
import axios from "axios";


export function addToCart(item) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.post(`http://localhost:8080/cart`,item,{
        headers:{"Content-Type":"application/json"}
      })
    
      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.patch(`http://localhost:8080/cart/${update.id}`,update,{
        headers:{"Content-Type":"application/json"}
      })
    
      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
export function deleteItemFromCart(item) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.delete(`http://localhost:8080/cart/${item.id}`)
    
      resolve({data:{id:item.id}})
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.get(`http://localhost:8080/cart?userId=${userId}`)
      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
