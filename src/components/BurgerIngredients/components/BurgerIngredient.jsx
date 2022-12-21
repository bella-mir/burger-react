import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getCountIngredients } from "../../../services/selectors/ingredients";
import classnames from "classnames";
import { IngredientPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";
import styles from "./burgerIngerdient.module.css";

export const BurgerIngredient = (props) => {
  const count = useSelector(
    getCountIngredients(props.ingredient._id, props.ingredient.type)
  );
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  return (
    <div
      className={classnames(styles.card, "pl-4 pb-6")}
      onClick={props.onClick}
      key={props.id}
      ref={dragRef}
    >
      <div className={styles.counter}>
        <Counter count={count || 0} size="default" />
      </div>
      <img
        src={props.ingredient.image_large}
        alt={props.ingredient.name}
        className={styles.image}
      />
      <div className={classnames(styles.row, "pt-1 pb-1")}>
        <span className="text text_type_digits-default pr-2">
          {props.ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={classnames(styles.title, "text text_type_main-default")}>
        {props.ingredient.name}
      </h4>
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
