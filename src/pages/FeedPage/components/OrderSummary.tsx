import { useSelector } from "react-redux";
import {
  getOrdersToday,
  getOrdersTotal,
} from "../../../services/selectors/allOrders";
import { IOrder } from "../../../services/types";
import styles from "./orderSummary.module.scss";

type TOrderSummaryProps = {
  orders: IOrder[] | undefined;
};

export const OrderSummary = ({ orders }: TOrderSummaryProps) => {
  const readyOrders = orders?.filter((order) => order.status === "done");
  const inProcessOrders = orders?.filter((order) => order.status !== "done");
  const allCompletedOrders = useSelector(getOrdersTotal);
  const todayCompletedOrders = useSelector(getOrdersToday);
  return (
    <div className={styles.content}>
      <div className={styles.status}>
        <div className={styles.column}>
          <p className="text text_type_main-medium">Готовы:</p>
          {readyOrders?.slice(0, 5).map((order) => (
            <>
              <p className="text text_type_digits-default">{order.number}</p>
            </>
          ))}
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium">В работе:</p>
          {inProcessOrders?.map((order) => (
            <>
              <p className="text text_type_digits-default">{order.number}</p>
            </>
          ))}
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{allCompletedOrders}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{todayCompletedOrders}</p>
      </div>
    </div>
  );
};
