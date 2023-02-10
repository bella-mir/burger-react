import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getSelectedIngredient,
  getAllIngredients,
} from "../../services/selectors/ingredients";
import styles from "./ingredient-details.module.css";
import classnames from "classnames";

export const IngredientDetails = () => {
  const selectedIngredient = useSelector(getSelectedIngredient);
  const allIngredients = useSelector(getAllIngredients);
  const { ingredientId } = useParams();
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    const ingredientById = allIngredients.filter(
      (ingredient) => ingredient._id === ingredientId
    );
    setIngredient(selectedIngredient ? selectedIngredient : ingredientById);
  }, [allIngredients, ingredientId, selectedIngredient]);

  if (!ingredient) {
    return null;
  } else {
    console.log(ingredient);
  }

  return (
    <>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div
        className={classnames(
          styles.composition,
          "text text_type_main-default text_color_inactive pt-8"
        )}
      >
        <div className={styles.element}>
          Калории, ккал <span>{ingredient.calories}</span>
        </div>
        <div className={styles.element}>
          Белки, г <span>{ingredient.proteins}</span>
        </div>
        <div className={styles.element}>
          Жиры, г <span>{ingredient.fat}</span>
        </div>
        <div className={styles.element}>
          Углеводы, г <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </>
  );
};
