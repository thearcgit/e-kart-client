// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    try {

      let res = await axios.get("")
      resolve(res)
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }

  }
  );
}
