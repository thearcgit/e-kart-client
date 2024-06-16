// A mock function to mimic making an async request for data
import axios from "axios";


export function createUser(userData) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post("http://localhost:8080/auth/signup",
        userData,
        { headers: { "Content-Type": "application/json" } },
      );
      resolve(res.data);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
export function loginUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.post("http://localhost:8080/auth/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }

      );
      if (res.status === 200) {
        resolve(res.data)
      } else {

        console.log('Non-200 status code:', res);
        // throw new Error(res.data || 'Login failed');
        reject({error:res.data})
      }
    } catch (error) {
      console.warn("Error during login:", error);
      // Throw the error to be caught by createAsyncThunk
      // throw new Error(error.response ? error.response.data.message || 'Login failed' : 'Network error');
      reject({error:error.response.data.message})
    }
  });
}
export function signout(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({ data: "Signed out successfully" })
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
