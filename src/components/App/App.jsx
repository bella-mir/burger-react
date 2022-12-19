import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { fetchIngredients } from "../../services/slices/ingredients";
import styles from "./app.module.css";
import { getStatus } from "../../services/selectors/ingredients";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  const status = useSelector(getStatus);

  return (
    <div className={styles.page}>
      <AppHeader />

      {status === "succeeded" ? (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      ) : (
        <h1>ЗАГРУЗКА</h1>
      )}
    </div>
  );
};

export default App;
