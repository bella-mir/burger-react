import styles from "./profilePage.module.scss";

import { ProfileMenu } from "./ProfileMenu";
import { getAllOrders } from "../../services/selectors/allOrders";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrderCard } from "../FeedPage/components/OrderCrad";

export const ProfileOrders = () => {
  const location = useLocation();
  const orders = useSelector(getAllOrders);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ProfileMenu />
        <div className={styles.info}>
          <div className={styles.list}>
            {orders?.map((order) => (
              <Link
                key={order._id}
                to={`/profile/orders/${order._id}`}
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
