// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get("http://localhost:8080/products");
      resolve(res);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
export function fetchProductsByFilters(filter, sort, pagination) {
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
  // for (let key in pagination) {
  //   queryString += `${key}=${pagination[key]}&`
  // }
  let { _page, _limit } = pagination;
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get(`http://localhost:8080/products/?${queryString}`);

        // Filter for Pagination..............
      let products = res.data.slice((_page - 1) * _limit, _page * _limit);
      let totalItems = res?.data.length

      resolve({products:products, totalItems:+totalItems});
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.get(`http://localhost:8080/products/${id}`);
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
      let res = await axios.get("http://localhost:8080/categories");
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
      let res = await axios.get("http://localhost:8080/brands");
      resolve(res);
    } catch (error) {
      console.error("Error fetching count:", error);
      resolve(null);
    }
  });
}
