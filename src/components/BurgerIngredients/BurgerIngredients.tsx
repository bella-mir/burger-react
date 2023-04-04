import React, { useEffect, useRef } from "react";
import { useAppSelector as useSelector } from "../../app/hooks";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.scss";
import cn from "classnames";
import { BurgerIngredientsGroup } from "./components/BurgerIngredientsGroup";
import { getAllIngredients } from "../../services/selectors/ingredients";
import { IIngredientProp } from "../../services/types";

export const BurgerIngredients = () => {
  const burgerData = useSelector(getAllIngredients);
  const [type, setType] = React.useState<string>("bun");
  const [buns, setBuns] = React.useState<IIngredientProp[] | null>(null);
  const [main, setMain] = React.useState<IIngredientProp[] | null>(null);
  const [sauces, setSauces] = React.useState<IIngredientProp[] | null>(null);

  const refContainer = useRef<HTMLDivElement>(null);
  const refBuns = useRef<HTMLDivElement>(null);
  const refSauces = useRef<HTMLDivElement>(null);
  const refMain = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    let currentTab = "bun";
    if (refContainer.current && refBuns.current && refSauces.current) {
      currentTab =
        refContainer.current.scrollTop - refBuns.current.clientHeight < 0
          ? "bun"
          : refContainer.current.scrollTop -
              refBuns.current.clientHeight -
              refSauces.current.clientHeight <
            0
          ? "sauce"
          : "main";
    }
    setType(currentTab);
  };

  const setTab = (tab: string) => {
    setType(tab);
    const element =
      tab === "bun"
        ? refBuns.current
        : tab === "sauce"
        ? refSauces.current
        : refMain.current;
    if (element)
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
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
    <section className={cn(styles.section, "mr-10")}>
      <div className="pt-10 mr-10 pb-10">
        <p className="text text_type_main-large pb-5">Соберите бургер</p>
        <div className={styles.tabs}>
          <Tab value="bun" active={type === "bun"} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={type === "sauce"} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="main" active={type === "main"} onClick={setTab}>
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
