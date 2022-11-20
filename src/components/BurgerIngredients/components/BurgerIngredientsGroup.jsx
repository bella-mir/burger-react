import React, { useState } from "react";
import { BurgerIngredient } from "./BurgerIngredient";
import { Modal } from "../../Modal/Modal";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/propTypes";
import { IngredientDetails } from "../../IngredientDetails/IngredientDetails";

import styles from "./burgerIngredientsGroup.module.css";

export const BurgerIngredientsGroup = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  return (
    <>
      <p className="text text_type_main-medium pb-6">{title}</p>
      <div className={styles.group}>
        {data.map((element) => (
          <BurgerIngredient
            ingredient={element}
            key={element._id}
            onClick={() => {
              setIngredient(element);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};
