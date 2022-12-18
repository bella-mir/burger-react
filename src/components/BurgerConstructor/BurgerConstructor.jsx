import React, { useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { IngredientPropTypes } from "../utils/propTypes";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getMultipleRandom } from "../utils/data-utils";
import styles from "./burgerConstructor.module.css";
import { orderCheckout } from "../utils/api";
import { useSelector } from "react-redux";
import { getIngredientsInConstructor } from "../../services/selectors/ingredients";

export const BurgerConstructor = () => {
  const burgerData = useSelector(getIngredientsInConstructor);

  const [isOpen, setIsOpen] = useState(false);

  const [orderNum, setOrderNum] = useState(null);

  const selectedBun = burgerData
    ? burgerData.filter((element) => element.type === "bun")[
        Math.floor(Math.random() * 2)
      ]
    : null;

  const all = burgerData
    ? burgerData.filter(
        (element) => element.type === "main" || element.type === "sauce"
      )
    : null;

  const randomFill = all && getMultipleRandom(all, 7);
  const randomFillIds =
    randomFill && randomFill.map((ingredient) => ingredient._id);

  // const sum = randomFill
  //   ? randomFill.reduce((accumulator, element) => {
  //       return accumulator + element.price;
  //     }, 0) +
  //     selectedBun.price * 2
  //   : null;

  const sum = 0;

  const handleClick = () => {
    setIsOpen(true);
    orderCheckout(randomFillIds).then((data) => setOrderNum(data.order.number));
  };

  return (
    <>
      <section className={classnames(styles.section, "pt-25 pr-2")}>
        {burgerData.length > 1 && (
          <>
            <div className={styles.main}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${selectedBun.name} (верх)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image_mobile}
              />
              <div className={styles.inner}>
                {randomFill.map((element) => (
                  <div
                    className={classnames(styles.element, "pb-4")}
                    key={element._id}
                  >
                    <DragIcon />
                    <ConstructorElement
                      text={element.name}
                      price={element.price}
                      thumbnail={element.image_mobile}
                    />
                  </div>
                ))}
              </div>

              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${selectedBun.name} (низ)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image_mobile}
              />
            </div>

            <section className={classnames(styles.count, "pt-10")}>
              <div className={classnames(styles.sum, "pr-10")}>
                <p className="text text_type_digits-medium">{sum}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={handleClick}
              >
                Оформить заказ
              </Button>
            </section>
          </>
        )}
      </section>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={""}>
          <OrderDetails orderNum={orderNum} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  burgerData: PropTypes.arrayOf(IngredientPropTypes),
};
