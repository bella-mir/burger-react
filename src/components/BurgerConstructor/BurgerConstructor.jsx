import React, { useEffect, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import classnames from "classnames";
import styles from "./burgerConstructor.module.css";

export const BurgerConstructor = ({ burgerData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, [burgerData]);

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

  const sum = burgerData
    ? burgerData.reduce((accumulator, element) => {
        return accumulator + element.price;
      }, 0)
    : null;

  return (
    <>
      <section className={classnames(styles.section, "pt-25")}>
        {burgerData && (
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
                {all.map((element) => (
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
                onClick={() => setIsOpen(true)}
              >
                Оформить заказ
              </Button>
            </section>
          </>
        )}
      </section>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={""}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
