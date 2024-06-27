// A mock function to mimic making an async request for data
import axios from "axios";


export function fetchUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get("/orders");
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject({ message: `User not found.` })
      }
    } catch (error) {
      console.error("user order error:", error);

    }
  });
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get("/users");
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject({ message: `User not found.` })
      }
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.patch("/users/" ,
        update,
        { headers: { "Content-Type": "application/json" } },
      );
      resolve(res.data);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}

