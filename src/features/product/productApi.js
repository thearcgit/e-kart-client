// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get("/products");
      resolve(res);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
export function fetchProductsByFilters(filter, sort, pagination,admin) {
  //todo: filter = {category:["smartphone","laptop"]}
  let queryString = "";
  for (let key in filter) {
    let valueArr = filter[key];
    if (valueArr.length > 0) {
      let lastValue = valueArr[valueArr.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    // TODO: sort on basis of order type
    // sort = {_sort:option.sort, _order:option.order}
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  if(admin){
    queryString += "admin=true"
  }
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get(`/products/?${queryString}`);

      // Filter for Pagination..............
      let products = res.data;
      let totalItems = await res?.headers.get("X-Total-Count")

      resolve({ products: products, totalItems: +totalItems });
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}

export const addNewProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.post(`/products`,
        product,
        { headers: { "Content-Type": "application/json" } },
      )
      if (res.status === 201) resolve(res.data)
    } catch (error) {
      console.log(error)

    }
  })
}

export const updateProduct = (product) => {
  return new Promise(async(resolve, reject) => {
    try {
      let res =await axios.patch(`/products/${product.id}`,
        product,
        { headers: { "Content-Type": "application/json" } },
    )
    if(res.status === 200){

      resolve(res.data)
    }
    } catch (error) {
      console.log(error)

    }
  })
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get(`/products/${id}`);
      resolve(res.data);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get("/categories");
      resolve(res);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get("/brands");
      resolve(res);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
