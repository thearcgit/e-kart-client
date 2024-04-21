// A mock function to mimic making an async request for data
import axios from "axios";


export function fetchUserOrders(userId) {
  return new Promise(async (resolve,reject) => {
    try {
      let res = await axios.get("http://localhost:8080/orders/?user.id="+userId,);
      if(res.status === 200){
       resolve(res.data)
    }else{
      reject({message:`User not found.`})
    }
  } catch (error) {
    console.error("user order error:", error);
    
  }
});
}

