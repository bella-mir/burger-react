import React from "react";
import cn from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./main.module.css";
import { getStatus } from "../../services/selectors/ingredients";

export const Main = () => {
  const status = useSelector(getStatus);

  return (
    <>
      {status === "succeeded" ? (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      ) : (
        <div className={cn(styles.loading, "text text_type_main-large")}>
          ЗАГРУЗКА
        </div>
      )}
    </>
  );
};
