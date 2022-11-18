import React, { useState } from "react";
import { BurgerIngredient } from "./BurgerIngredient";
import { Modal } from "../../Modal/Modal";
import { IngredientDetails } from "../../IngredientDetails/IngredientDetails";

import styles from "./burgerIngredientsGroup.module.css";

export const BurgerIngredientsGroup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState({});

  return (
    <>
      <p className="text text_type_main-medium pb-6">{props.title}</p>
      <div className={styles.group}>
        {props.data.map((element) => (
          <BurgerIngredient
            {...element}
            key={element._id}
            onClick={() => {
              setIngredient(element);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={"Детали ингридиента"}>
          <IngredientDetails {...ingredient} />
        </Modal>
      )}
    </>
  );
};
