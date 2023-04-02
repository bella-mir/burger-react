import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadIngerdients } from "../../utils/api";
import {
  selectIngredient,
  addToConstructor,
  deleteFromConstructor,
  reorderIngredients,
  deleteAllFromConstructor,
} from "../actions/ingredients";
import { INGREDIENTS_STATE_KEY } from "../services-constants";
import { IIngredientsState } from "../types";

export const initialState: IIngredientsState = {
  data: [],
  status: "",
  error: "",
  selectedIngredient: null,
  ingredientsInConstructor: { bun: null, ingredients: [] },
};

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_STATE_KEY}/fetchIngredients`,
  async () => {
    const response = await loadIngerdients();
    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(selectIngredient, (state, action) => {
      state.selectedIngredient = action.payload;
    });
    builder.addCase(addToConstructor, (state, action) => {
      action.payload.type === "bun"
        ? (state.ingredientsInConstructor.bun = action.payload)
        : action.payload &&
          state.ingredientsInConstructor.ingredients?.push(action.payload);
    });
    builder.addCase(deleteFromConstructor, (state, action) => {
      action.payload.type === "bun"
        ? (state.ingredientsInConstructor.bun = null)
        : (state.ingredientsInConstructor.ingredients =
            state.ingredientsInConstructor?.ingredients?.filter(
              (ingredient) => ingredient.elementId !== action.payload.elementId
            ));
    });
    builder.addCase(deleteAllFromConstructor, (state, action) => {
      state.ingredientsInConstructor = { bun: null, ingredients: [] };
    });
    builder.addCase(reorderIngredients, (state, action) => {
      if (!state.ingredientsInConstructor.ingredients) {
        return;
      }
      const newOrderedData = state.ingredientsInConstructor.ingredients;
      const [reorderedItem] =
        newOrderedData && newOrderedData.splice(action.payload[0], 1);
      newOrderedData.splice(action.payload[1], 0, reorderedItem);
      state.ingredientsInConstructor.ingredients = newOrderedData;
    });
  },
});
