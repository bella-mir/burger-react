import { useEffect } from "react";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import {
  connectionClosed,
  startConnecting,
} from "../../services/actions/allOrders";
import { getOrders } from "../../services/selectors/allOrders";
import { OrderCard } from "./components/OrderCrad";
import { OrderSummary } from "./components/OrderSummary";
import styles from "./feedPage.module.scss";

export const FeedPage = () => {
  const dispatch = useDispatch();

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
              key={order.number}
              to={`/feed/${order.number}`}
              state={{ background: location }}
              className={styles.link}
            >
              <OrderCard order={order} key={order._id} />
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
