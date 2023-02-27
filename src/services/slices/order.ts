import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDER_STATE_KEY } from "../services-constants";
import { orderCheckout } from "../../utils/api";
import { IOrderState } from "../types";

const initialState: IOrderState = {
  order: null,
  status: "",
};

export const postOrder = createAsyncThunk(
  `${ORDER_STATE_KEY}/postOrder`,
  async (selectedIngredientsIds: string[]) => {
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
    });
  },
});
