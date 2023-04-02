import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector as useSelector } from "../../app/hooks";
import { getAllIngredients } from "../../services/selectors/ingredients";
import cn from "classnames";
import styles from "./ingredient-details.module.scss";
import { IIngredientProp } from "../../services/types";

export const IngredientDetails = () => {
  const allIngredients = useSelector(getAllIngredients);
  const { ingredientId } = useParams();

  const [ingredient, setIngredient] = useState<IIngredientProp | null>(null);

  useEffect(() => {
    const ingredient = allIngredients.filter(
      (ingredient) => ingredient._id === ingredientId
    );
    setIngredient(ingredient[0]);
  }, [allIngredients, ingredientId]);

  if (!ingredient) {
    return null;
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
        className={cn(
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
