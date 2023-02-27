import { createAction } from "@reduxjs/toolkit";
import { INGREDIENTS_STATE_KEY } from "../services-constants";
import { IConstructorProps, IIngredientProp } from "../types";

export const deleteAllFromConstructor = createAction(
  `${INGREDIENTS_STATE_KEY}/deleteAllFromConstructor`
);

export const reorderIngredients = createAction(
  `${INGREDIENTS_STATE_KEY}/reorderIngredients`,
  (payload: number[]) => ({
    payload,
  })
);

export const deleteFromConstructor = createAction(
  `${INGREDIENTS_STATE_KEY}/deleteFromConstructor`,
  (payload: IConstructorProps) => ({
    payload,
  })
);

export const selectIngredient = createAction(
  `${INGREDIENTS_STATE_KEY}/selectIngredient`,
  (payload: IConstructorProps) => ({
    payload,
  })
);

export const addToConstructor = createAction(
  `${INGREDIENTS_STATE_KEY}/addToConstructor`,
  (payload: IIngredientProp) => ({
    payload,
  })
);
