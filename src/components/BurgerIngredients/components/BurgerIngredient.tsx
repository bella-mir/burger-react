import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useAppSelector as useSelector } from "../../../app/hooks";
import { getCountIngredients } from "../../../services/selectors/ingredients";
import cn from "classnames";
import styles from "./burgerIngerdient.module.scss";
import { IIngredientProp } from "../../../services/types";

interface IBurgerIngredient {
  id: string;
  ingredient: IIngredientProp;
  onClick: () => void;
}

export const BurgerIngredient = ({
  id,
  ingredient,
  onClick,
}: IBurgerIngredient) => {
  const count = useSelector(
    getCountIngredients(ingredient._id, ingredient.type)
  );
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  return (
    <div
      className={cn(styles.card, "pl-4 pb-6")}
      onClick={onClick}
      key={id}
      ref={dragRef}
    >
      <div className={styles.counter}>
        <Counter count={count || 0} size="default" />
      </div>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles.image}
      />
      <div className={cn(styles.row, "pt-1 pb-1")}>
        <span className="text text_type_digits-default pr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={cn(styles.title, "text text_type_main-default")}>
        {ingredient.name}
      </h4>
    </div>
  );
};
