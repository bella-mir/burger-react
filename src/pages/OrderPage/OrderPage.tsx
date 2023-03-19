import { OrderDetails } from "../FeedPage/components/OrderDetails";
import styles from "./order-page.module.scss";

export const OrderPage = () => {
  return (
    <div className={styles.content}>
      <OrderDetails />
    </div>
  );
};
