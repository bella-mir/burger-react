import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDER_STATE_KEY } from "../services-constants";
import { orderCheckout } from "../../components/utils/api";

const initialState = {
  order: {},
  status: "",
  error: "",
};

export const postOrder = createAsyncThunk(
  `${ORDER_STATE_KEY}/postOrder`,
  async (selectedIngredientsIds) => {
    const response = await orderCheckout(selectedIngredientsIds);
    return response.order;
  }
);

export const orderSlice = createSlice({
  name: ORDER_STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.order = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
