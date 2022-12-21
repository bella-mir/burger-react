import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadIngerdients } from "../../utils/api";
import {
  selectIngredient,
  addToConstructor,
  deleteFromConstructor,
  reorderIngredients,
} from "../actions/ingredients";
import { INGREDIENTS_STATE_KEY } from "../services-constants";

const initialState = {
  data: [],
  status: "",
  error: "",
  selectedIngredient: {},
  ingredientsInConstructor: { bun: {}, ingredients: [] },
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
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(selectIngredient, (state, action) => {
      state.selectedIngredient = action.payload;
    });
    builder.addCase(addToConstructor, (state, action) => {
      action.payload.type === "bun"
        ? (state.ingredientsInConstructor.bun = action.payload)
        : state.ingredientsInConstructor.ingredients.push(action.payload);
    });
    builder.addCase(deleteFromConstructor, (state, action) => {
      action.payload.type === "bun"
        ? (state.ingredientsInConstructor.bun = "")
        : (state.ingredientsInConstructor.ingredients =
            state.ingredientsInConstructor.ingredients.filter(
              (ingredient) => ingredient.elementId !== action.payload
            ));
    });
    builder.addCase(reorderIngredients, (state, action) => {
      const newOrderedData = state.ingredientsInConstructor.ingredients;
      const [reorderedItem] = newOrderedData.splice(action.payload[0], 1);
      newOrderedData.splice(action.payload[1], 0, reorderedItem);
      state.ingredientsInConstructor.ingredients = newOrderedData;
    });
  },
});
