import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import styles from "./burgerIngerdient.module.css";

export const BurgerIngredient = (props) => {
  return (
    <div className={classnames(styles.card, "pl-4 pr-6 pb-6")}>
      <div  className={styles.counter}>
      <Counter count={1} size="default" className={styles.counter} />
      </div>
      <img src={props.image_large} alt={props.name} className={styles.image} />
      <div className={classnames(styles.row, "pt-1 pb-1")}>
        <span className="text text_type_digits-default pr-2">
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={classnames(styles.title, "text text_type_main-default")}>
        {props.name}
      </h4>
    </div>
  );
};
