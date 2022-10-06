import React from "react";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "./components/BurgerIngredient";
import styles from "./burgerIngredients.module.css";
import { data } from "../utils/data";
import { IngredientsPropTypes } from "../utils/propTypes";

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");

  const buns = data.filter((element) => element.type === "bun");
  const main = data.filter((element) => element.type === "main");
  const sources = data.filter((element) => element.type === "sauce");

  return (
    <section className={styles.section}>
      <div className="pt-10 mr-10 pb-10">
        <p className="text text_type_main-large pb-5">Соберите бургер</p>
        <div className={styles.tabs}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={styles.groups}>
        <p className="text text_type_main-medium pb-6">Булки</p>
        <div className={styles.group}>
          {buns.map((element) => (
            <BurgerIngredient {...element} key={element.id} />
          ))}
        </div>
        <p className="text text_type_main-medium pb-6">Соусы</p>
        <div className={styles.group}>
          {sources.map((element) => (
            <BurgerIngredient {...element} key={element.id} />
          ))}
        </div>
        <p className="text text_type_main-medium pb-6">Начинки</p>
        <div className={styles.group}>
          {main.map((element) => (
            <BurgerIngredient {...element} key={element.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  thread: PropTypes.arrayOf(IngredientsPropTypes)
};
