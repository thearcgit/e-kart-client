// A mock function to mimic making an async request for data
import axios from "axios";


export function addToCart(item) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.post(`/cart`,item,{
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

      let res = await axios.patch(`/cart/${update.id}`,update,{
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

      let res = await axios.delete(`/cart/${item.id}`)
    
      resolve({data:{id:item.id}})
    } catch (error) {
      console.error("Delete count error:", error);
      resolve(null);
    }

  }
  );
}
export function resetCart() {
  return new Promise(async (resolve) => {
    try {

      let allItems = await fetchItemsByUserId()
      for(let item of allItems){
        await deleteItemFromCart(item)
      }
    
      resolve({status:"success"})
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.get(`/cart`)
      resolve(res.data)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
