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

const initialState: IIngredientsState = {
  data: [],
  status: "",
  error: "",
  selectedIngredient: null,
  ingredientsInConstructor: { bun: null, ingredients: [] },
  order: {},
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
      action.payload === "bun"
        ? (state.ingredientsInConstructor.bun = action.payload)
        : action.payload &&
          state.ingredientsInConstructor.ingredients?.push(action.payload);
    });
    builder.addCase(deleteFromConstructor, (state, action) => {
      action.payload === "bun"
        ? (state.ingredientsInConstructor.bun = null)
        : (state.ingredientsInConstructor.ingredients =
            state?.ingredientsInConstructor?.ingredients &&
            state?.ingredientsInConstructor?.ingredients.filter(
              (ingredient) => ingredient.elementId !== action.payload
            ));
    });
    builder.addCase(deleteAllFromConstructor, (state, action) => {
      state.ingredientsInConstructor = { bun: null, ingredients: [] };
    });
    builder.addCase(reorderIngredients, (state, action) => {
      const newOrderedData = state.ingredientsInConstructor.ingredients;
      const reorderedItem =
        action.payload && newOrderedData?.splice(action.payload[0], 1);
      action.payload &&
        reorderedItem &&
        newOrderedData?.splice(action.payload[1], 0, reorderedItem);
      state.ingredientsInConstructor.ingredients = newOrderedData;
    });
  },
});
