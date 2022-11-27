import React, { useEffect, useState } from "react";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerDataContext } from "../context/burger-data-context";
import styles from "./app.module.css";
import { getIngerdients } from "../utils/api";

function App() {
  const [burgerData, setBurgerData] = useState();

  useEffect(() => {
    getIngerdients().then((data) => setBurgerData(data.data));
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerDataContext.Provider value={burgerData}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerDataContext.Provider>
      </main>
    </div>
  );
}

export default App;
