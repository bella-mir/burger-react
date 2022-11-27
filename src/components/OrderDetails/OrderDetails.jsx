import React from "react";
import styles from "./order-details.module.css";
import PropTypes from "prop-types";
import classnames from "classnames";

export const OrderDetails = ({ orderNum }) => {

  return (
    <>
      <p className="text text_type_digits-large">{orderNum}</p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <div
        className={classnames(
          styles.done,
          "text text_type_main-medium mt-15 mb-15"
        )}
      ></div>
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

OrderDetails.propTypes = {
  orderNum: PropTypes.number,
};
