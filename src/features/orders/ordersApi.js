// A mock function to mimic making an async request for data
import axios from "axios";


export function createOrder(order) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.post(`http://localhost:8080/orders`,order,{
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
