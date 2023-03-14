import { Link } from "react-router-dom";
import styles from "./feedPage.module.scss";

export const FeedPage = () => {
  return (
    <div className={styles.content}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-large">Страница не найдена</p>
      <Link className={styles.link} to={"-1"}>
        Вернуться
      </Link>
    </div>
  );
};
