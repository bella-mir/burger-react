import styles from "./profilePage.module.scss";
import { ProfileMenu } from "./ProfileMenu";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { OrderCard } from "../FeedPage/components/OrderCrad";
import { useEffect } from "react";
import {
  connectionClosed,
  startConnecting,
} from "../../services/actions/userOrders";
import { getUserOrders } from "../../services/selectors/userOrders";

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(startConnecting());
    return () => {
      dispatch(connectionClosed());
    };
  }, [dispatch, token]);

  const location = useLocation();
  const orders = useSelector(getUserOrders);
  return (
    <div className={styles.wrapper} key={orders?.length}>
      <div className={styles.content}>
        <ProfileMenu />
        <div className={styles.info}>
          <div className={styles.list}>
            {orders?.map((order) => (
              <Link
                key={order._id}
                to={`/profile/orders/${order.number}`}
                state={{ background: location }}
                className={styles.link}
              >
                <OrderCard order={order} className={styles.card} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
