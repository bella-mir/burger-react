import React, { useEffect, useState } from "react";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { API_URL } from "./app-constants";
import { checkResponse } from "../utils/checkResponse";

import styles from "./app.module.css";

function App() {
  const [burgerData, setBurgerData] = useState();

  useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then(checkResponse)
      .then((data) => setBurgerData(data.data));
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients burgerData={burgerData} />
        <BurgerConstructor burgerData={burgerData} />
      </main>
    </div>
  );
}

export default App;
