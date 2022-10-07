import React from "react";
import { BurgerIngredient } from "./BurgerIngredient";
import styles from "./burgerIngredientsGroup.module.css";

export const BurgerIngredientsGroup = (props) => {
  return (
    <>
      <p className="text text_type_main-medium pb-6">{props.title}</p>
      <div className={styles.group}>
        {props.data.map((element) => (
          <BurgerIngredient {...element} key={element.id} />
        ))}
      </div>
    </>
  );
};
