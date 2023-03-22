import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  connectionClosed,
  startConnecting,
} from "../../services/actions/allOrders";
import { getOrders } from "../../services/selectors/allOrders";
import { AppDispatch } from "../../services/store";
import { OrderCard } from "./components/OrderCrad";
import { OrderSummary } from "./components/OrderSummary";
import styles from "./feedPage.module.scss";

export const FeedPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startConnecting());
    return () => {
      dispatch(connectionClosed());
    };
  }, [dispatch]);

  const location = useLocation();
  const orders = useSelector(getOrders);
  return (
    <div className={styles.page}>
      <p className="text text_type_main-medium">Лента заказов</p>
      <div className={styles.content}>
        <div className={styles.list}>
          {orders?.map((order) => (
            <Link
              key={order._id}
              to={`/feed/${order.number}`}
              state={{ background: location }}
              className={styles.link}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </div>
        <div className={styles.summary}>
          <OrderSummary orders={orders} />
        </div>
      </div>
    </div>
  );
};
