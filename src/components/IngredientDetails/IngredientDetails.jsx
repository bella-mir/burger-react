import React from "react";
import { useSelector } from "react-redux";
import { getSelectedIngredient } from "../../services/selectors/ingredients";
import styles from "./ingredient-details.module.css";
import classnames from "classnames";

export const IngredientDetails = () => {
  const ingredient = useSelector(getSelectedIngredient);
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
