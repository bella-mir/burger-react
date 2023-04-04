import {
  selectIngredient,
  addToConstructor,
  deleteFromConstructor,
  deleteAllFromConstructor,
} from "../actions/ingredients";
import { ingredientsSlice, initialState } from "./ingredients";

const mockedSelectedIngredient = {
  elementId: 666,
};

const mockedIngredientProp = {
  _id: "60d3b41abdacab0026a733c6",
  elementId: 666,
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const dataReducer = ingredientsSlice.reducer;

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("select ingredients to show info about it (selectIngredient)", () => {
    expect(
      dataReducer(initialState, {
        type: selectIngredient,
        payload: mockedSelectedIngredient,
      })
    ).toEqual({
      ...initialState,
      selectedIngredient: mockedSelectedIngredient,
    });
  });

  it("add ingredient to constructo (addToConstructor)", () => {
    expect(
      dataReducer(initialState, {
        type: addToConstructor,
        payload: mockedIngredientProp,
      })
    ).toEqual({
      ...initialState,
      ingredientsInConstructor:
        mockedIngredientProp && mockedIngredientProp.type === "bun"
          ? {
              ...initialState.ingredientsInConstructor,
              bun: mockedIngredientProp,
            }
          : {
              ...initialState.ingredientsInConstructor,
              ingredients: mockedIngredientProp,
            },
    });
  });

  it("delete ingredient from constructor (deleteFromConstructor)", () => {
    expect(
      dataReducer(initialState, {
        type: deleteFromConstructor,
        payload: mockedIngredientProp,
      })
    ).toEqual({
      ...initialState,
      ingredientsInConstructor: initialState.ingredientsInConstructor,
    });
  });

  it("delete all orders from constructor (deleteAllFromConstructor)", () => {
    expect(
      dataReducer(initialState, {
        type: deleteAllFromConstructor,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
