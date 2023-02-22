import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BurgerIngredient } from "./BurgerIngredient";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../../utils/propTypes";
import styles from "./burgerIngredientsGroup.module.css";
import { selectIngredient } from "../../../services/actions/ingredients";

export const BurgerIngredientsGroup = ({ title, data }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div>
      <p className="text text_type_main-medium pb-6">{title}</p>
      <div className={styles.group}>
        {data.map((element) => (
          <Link
            key={element._id}
            to={`/ingredients/${element._id}`}
            state={{ background: location }}
            className={styles.link}
          >
            <BurgerIngredient
              ingredient={element}
              key={element._id}
              onClick={() => {
                dispatch(selectIngredient(element));
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

BurgerIngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};
