import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadIngerdients } from "../../components/utils/api";
import {
  selectIngredient,
  addToConstructor,
  deleteFromConstructor,
} from "../actions/ingredients";
import { INGREDIENTS_STATE_KEY } from "../ingredients-constants";

const initialState = {
  data: [],
  status: "",
  error: "",
  selectedIngredient: {},
  ingredientsInConstructor: [],
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
      state.ingredientsInConstructor = state.ingredientsInConstructor.push(
        action.payload
      );
    });
    builder.addCase(deleteFromConstructor, (state, action) => {
      state.ingredientsInConstructor = state.ingredientsInConstructor.filter(
        (item) => {
          return item !== action.payload;
        }
      );
    });
  },
});
