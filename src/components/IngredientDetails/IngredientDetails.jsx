import React from "react";
import { IngredientsPropTypes } from "../utils/propTypes";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import classnames from "classnames";

export const IngredientDetails = ({
  image,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <>
      <img src={image} alt={name} className={styles.image} />
      <p className="text text_type_main-medium">{name}</p>
      <div
        className={classnames(
          styles.composition,
          "text text_type_main-default text_color_inactive pt-8"
        )}
      >
        <div className={styles.element}>
          Калории, ккал <span>{calories}</span>
        </div>
        <div className={styles.element}>
          Белки, г <span>{proteins}</span>
        </div>
        <div className={styles.element}>
          Жиры, г <span>{fat}</span>
        </div>
        <div className={styles.element}>
          Углеводы, г <span>{carbohydrates}</span>
        </div>
      </div>
    </>
  );
};


IngredientDetails.propTypes = {
  props: PropTypes.shape(IngredientsPropTypes).isRequired,
};


