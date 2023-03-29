// import {
//   selectIngredient,
//   addToConstructor,
//   deleteFromConstructor,
//   reorderIngredients,
//   deleteAllFromConstructor,
// } from "../actions/ingredients";

// import { ingredientsSlice } from "./ingredients";

// const initialState = {
//   data: [],
//   status: "",
//   error: "",
//   selectedIngredient: null,
//   ingredientsInConstructor: { bun: null, ingredients: [] },
// };

// const dataReducer = ingredientsSlice.reducer;

// describe("dataReducer", () => {
//   it("should return the initial state", () => {
//     expect(ingredientsSlice.reducer(undefined, { type: undefined })).toEqual(
//       initialState
//     );
//   });

//   it("select ingredients to show info about it (selectIngredient)", () => {
//     expect(
//       dataReducer(initialState, {
//         type: selectIngredient,
//       })
//     ).toEqual({
//       ...initialState,
//       isEstablishingConnection: true,
//     });
//   });

//   it("add ingredient to constructo (addToConstructor)", () => {
//     expect(
//       dataReducer(initialState, {
//         type: addToConstructor,
//       })
//     ).toEqual({
//       ...initialState,
//       isConnected: true,
//     });
//   });

//   it("delete ingredient from constructor (deleteFromConstructor)", () => {
//     expect(
//       dataReducer(initialState, {
//         type:  deleteFromConstructor,
//       })
//     ).toEqual({
//       ...initialState,
//     });
//   });

//   it("reoder ingredients in costructor (reorderIngredients)", () => {
//     expect(
//       dataReducer(initialState, {
//         type: reorderIngredients,
//       })
//     ).toEqual({
//       ...initialState,
//     });
//   });

//   it("recieve all Orders from websocket server(deleteAllFromConstructor)", () => {
//     expect(
//       dataReducer(initialState, {
//         type: deleteAllFromConstructor,
//       })
//     ).toEqual({
//       ...initialState,
//     });
//   });
// });
