import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import styles from "./ingredient-page.module.css";

export const IngredientPage = () => {
  return (
    <div className={styles.content}>
      <IngredientDetails />
    </div>
  );
};
