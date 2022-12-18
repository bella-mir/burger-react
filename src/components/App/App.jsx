import React, { useEffect } from "react";
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
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      ) : (
        <h1>ЗАГРУЗКА</h1>
      )}
    </div>
  );
};

export default App;
