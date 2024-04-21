// A mock function to mimic making an async request for data
import axios from "axios";


export function createUser(userData) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post("http://localhost:8080/users",
         userData ,
        { headers: { "Content-Type": "application/json" } },
      );
      resolve(res.data);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
export function fetchUser(loginData) {
  const {email,password} = loginData
  return new Promise(async (resolve,reject) => {
    try {
      let res = await axios.get("http://localhost:8080/users/?email="+email,);
      if(res.data.length){
        if(password === res.data[0].password) resolve(res.data)
        else reject({message:`wrong credentials.`})
    }else{
      reject({message:`User not found.`})
    }
  } catch (error) {
    console.error("Error fetching count:", error);
    resolve(null);
  }
});
}
export function updateUserAddress(update) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.patch("http://localhost:8080/users/"+update.id,
         update ,
        { headers: { "Content-Type": "application/json" } },
      );
      resolve(res.data);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
