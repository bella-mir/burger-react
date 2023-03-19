import { IOrder } from "../../../services/types";
import cn from "classnames";
import styles from "./orderCard.module.scss";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getAllIngredients } from "../../../services/selectors/ingredients";
import { useSelector } from "react-redux";

type TOrderCardProps = {
  order: IOrder;
  className?: string;
};

export const OrderCard = ({ order, className }: TOrderCardProps) => {
  const allIngredients = useSelector(getAllIngredients);
  const orderIngredients = order.ingredients;
  const ingredientsInfo = allIngredients
    .filter((ingredient) => orderIngredients.includes(ingredient._id))
    .map((ingredient) => {
      return { image: ingredient.image_mobile, price: ingredient.price };
    });

  const orderPrice = ingredientsInfo.reduce((accumulator, element) => {
    return accumulator + element.price;
  }, 0);

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.head}>
        <p className="text text_type_main-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
      <div className={styles.bottom}>
        <div className={styles.images}>
          {ingredientsInfo.map((ingredient) => (
            <img
              className={styles.image}
              src={ingredient.image}
              alt={"jj"}
            ></img>
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
