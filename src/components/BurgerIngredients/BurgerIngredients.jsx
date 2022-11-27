import React, { useEffect, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../utils/propTypes";
import PropTypes from "prop-types";
import styles from "./burgerIngredients.module.css";
import classnames from "classnames";
import { BurgerIngredientsGroup } from "./components/BurgerIngredientsGroup";
import { BurgerDataContext } from "../context/burger-data-context";

export const BurgerIngredients = () => {
  const [type, setType] = React.useState("bun");
  const [buns, setBuns] = React.useState(null);
  const [main, setMain] = React.useState(null);
  const [sauces, setSauces] = React.useState(null);
  const burgerData = useContext(BurgerDataContext);

  useEffect(() => {
    if (!burgerData) {
      return;
    }
    setBuns(burgerData.filter((element) => element.type === "bun"));
    setMain(burgerData.filter((element) => element.type === "main"));
    setSauces(burgerData.filter((element) => element.type === "sauce"));
  }, [burgerData]);

  return (
    <section className={classnames(styles.section, "mr-10")}>
      <div className="pt-10 mr-10 pb-10">
        <p className="text text_type_main-large pb-5">Соберите бургер</p>
        <div className={styles.tabs}>
          <Tab value="bun" active={type === "bun"} onClick={setType}>
            Булки
          </Tab>
          <Tab value="main" active={type === "main"} onClick={setType}>
            Соусы
          </Tab>
          <Tab value="sauce" active={type === "sauce"} onClick={setType}>
            Начинки
          </Tab>
        </div>
      </div>

      {buns && sauces && main && (
        <div className={styles.groups}>
          <BurgerIngredientsGroup title="Булки" data={buns} />
          <BurgerIngredientsGroup title="Соусы" data={sauces} />
          <BurgerIngredientsGroup title="Начинки" data={main} />
        </div>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  burgerData: PropTypes.arrayOf(IngredientPropTypes),
};
