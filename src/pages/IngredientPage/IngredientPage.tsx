import { IngredientDetails } from "../../components/IngredientDetails";
import styles from "./ingredient-page.module.scss";

export const IngredientPage = () => {
  return (
    <div className={styles.content}>
      <IngredientDetails />
    </div>
  );
};
