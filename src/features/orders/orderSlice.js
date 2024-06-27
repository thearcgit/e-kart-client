import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchCount, updateOrder } from './ordersApi';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrders:null,
};


export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'orders/fetchAllOrders',
  async ({sort,pagination}) => {
  const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetOrder: (state) => {

      state.currentOrder = null;
    },
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders= action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index]= action.payload;
      })
  },
});

export const { resetOrder } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const myOrders = (state) => state.orders;
export const selectAllOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;


export default orderSlice.reducer;
