import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BurgerIngredient } from "./BurgerIngredient";
import styles from "./burgerIngredientsGroup.module.scss";
import { AppDispatch } from "../../../services/store";
import { IIngredientProp } from "../../../services/types";
import { selectIngredient } from "../../../services/actions/ingredients";

interface IBurgerIngredientsProps {
  title: string;
  data: IIngredientProp[];
}

export const BurgerIngredientsGroup = ({
  title,
  data,
}: IBurgerIngredientsProps) => {
  const dispatch = useDispatch<AppDispatch>();
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
              id={element._id}
              onClick={() => {
                dispatch(selectIngredient({element}));
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
