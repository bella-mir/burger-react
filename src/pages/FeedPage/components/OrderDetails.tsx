import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useAppSelector as useSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { getAllIngredients } from "../../../services/selectors/ingredients";
import { IOrder } from "../../../services/types";
import styles from "./order-details.module.scss";
import { getOrderDetails } from "../../../utils/api";

interface IIngredientCounts {
  [key: string]: number;
}

export const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (!orderId) {
      return;
    }
    getOrderDetails(orderId).then((data) => setOrder(data.orders[0]));
  }, [orderId]);

  const allIngredients = useSelector(getAllIngredients);
  const ingredientsDetails = allIngredients.filter((ingredient) =>
    order?.ingredients?.includes(ingredient._id)
  );

  const ingredientsCounts: IIngredientCounts = {};
  order?.ingredients?.forEach((id) => {
    ingredientsCounts[id] = (ingredientsCounts[id] || 0) + 1;
  });

  const orderPrice = ingredientsDetails.reduce((accumulator, element) => {
    return accumulator + element.price * ingredientsCounts[element._id];
  }, 0);

  if (!order) {
    return null;
  }

  return (
    <div className={styles.content} key={order._id}>
      <p className={cn("text text_type_digits-default", styles.orderNumber)}>
        #{order.number}
      </p>
      <div>
        <p className="text text_type_main-medium">{order.name}</p>
        {order.status === "done" ? <p>Выполнен</p> : <p>В работе</p>}
      </div>
      <div className={styles.compound}>
        <p className="text text_type_main-medium">Состав:</p>
        <div className={styles.ingredients}>
          {ingredientsDetails.map((ingredient) => (
            <div className={styles.ingredientInfo} key={ingredient._id}>
              <div className={styles.ingredientDetail}>
                <img
                  src={ingredient.image_mobile}
                  alt="aaa"
                  className={styles.ingredientImage}
                ></img>
                <p className="text text_type_main-default">{ingredient.name}</p>
              </div>
              <div className={styles.ingredientDetail}>
                <p className="text text_type_digits-default">
                  {ingredientsCounts[ingredient._id]} X {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.summary}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={"text_color_inactive"}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
