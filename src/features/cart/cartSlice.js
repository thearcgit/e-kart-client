import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchCount, fetchItemsByUserId, resetCart, updateCart } from './cartApi';

const initialState = {
  item: [],
  status: 'idle',
  cartItems:null

};

export const addToCartAsync = createAsyncThunk(
  'items/addToCart',
  async (itemData) => {
    const response = await addToCart(itemData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'items/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const updateCartAsync = createAsyncThunk(
  'items/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  'items/deleteItemFromCart',
  async (item) => {
    const response = await deleteItemFromCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const resetCartAsync = createAsyncThunk(
  'items/resetCart',
  async (user) => {
    try {
      
      const response = await resetCart(user.id);
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (error) {
      console.log('reset cart error',error)

      
    }
  }
);

export const cartSlice = createSlice({
  name: 'item',
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
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state?.cartItems?.findIndex(item => item.id === action.payload.id)
        state.cartItems[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state?.cartItems?.findIndex(item => item.id === action.payload.data.id)
        state.cartItems.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = []
        
      })
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = state => state.cart.cartItems

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;


export default cartSlice.reducer;
