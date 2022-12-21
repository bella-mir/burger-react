import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BurgerIngredient } from "./BurgerIngredient";
import { Modal } from "../../Modal/Modal";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../../utils/propTypes";
import { IngredientDetails } from "../../IngredientDetails/IngredientDetails";

import styles from "./burgerIngredientsGroup.module.css";
import { selectIngredient } from "../../../services/actions/ingredients";

export const BurgerIngredientsGroup = ({ title, data }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p className="text text_type_main-medium pb-6">{title}</p>
      <div className={styles.group}>
        {data.map((element) => (
          <BurgerIngredient
            ingredient={element}
            key={element._id}
            onClick={() => {
              dispatch(selectIngredient(element));
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={"Детали ингредиента"}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};
