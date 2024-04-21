import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrders } from './userAPI';


const initialState = {
  userOrders: null,
  userInfo: null,
  error:null

};



export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (id) => {
    console.log('user order res')
    
    const response = await fetchUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

      state.value += 1;
    },
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
     
  },
});

export const { increment } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;