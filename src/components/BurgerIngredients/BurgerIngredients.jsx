import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../utils/propTypes";
import PropTypes from "prop-types";
import styles from "./burgerIngredients.module.css";
import classnames from "classnames";
import { BurgerIngredientsGroup } from "./components/BurgerIngredientsGroup";

import { getAllIngredients } from "../../services/selectors/ingredients";

export const BurgerIngredients = () => {
  const burgerData = useSelector(getAllIngredients);
  const [type, setType] = React.useState("bun");
  const [buns, setBuns] = React.useState(null);
  const [main, setMain] = React.useState(null);
  const [sauces, setSauces] = React.useState(null);

  const refContainer = useRef(null);
  const refBuns = useRef(null);
  const refSauces = useRef(null);
  const refMain = useRef(null);

  const scrollHandler = (e) => {
    let currentTab = "bun";
    if (refContainer.current && refBuns.current && refSauces.current) {
      currentTab =
        refContainer.current.scrollTop - refBuns.current.clientHeight < 0
          ? "bun"
          : refContainer.current.scrollTop -
              refBuns.current.clientHeight -
              refSauces.current.clientHeight <
            0
          ? "main"
          : "sauce";
    }
    setType(currentTab);
  };

  const setTab = (tab) => {
    setType(tab);
    const element =
      tab === "bun"
        ? refBuns.current
        : tab === "sauce"
        ? refSauces.current
        : refMain.current;
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

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
          <Tab value="bun" active={type === "bun"} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="main" active={type === "main"} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="sauce" active={type === "sauce"} onClick={setTab}>
            Начинки
          </Tab>
        </div>
      </div>

      {buns && sauces && main && (
        <div
          className={styles.groups}
          onScroll={scrollHandler}
          ref={refContainer}
        >
          <div ref={refBuns}>
            <BurgerIngredientsGroup title="Булки" data={buns} />
          </div>
          <div ref={refSauces}>
            <BurgerIngredientsGroup title="Соусы" data={sauces} />
          </div>
          <div ref={refMain}>
            <BurgerIngredientsGroup title="Начинки" data={main} />
          </div>
        </div>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  burgerData: PropTypes.arrayOf(IngredientPropTypes),
};
