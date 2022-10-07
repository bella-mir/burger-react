import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../utils/data";
import classnames from "classnames";
import styles from "./burgerConstructor.module.css";

export const BurgerConstructor = () => {
  const selectedBun = data.filter((element) => element.type === "bun")[
    Math.floor(Math.random() * 2)
  ];
  const all = data.filter(
    (element) => element.type === "main" || element.type === "sauce"
  );

  const sum = data.reduce((accumulator, element) => {
    return accumulator + element.price;
  }, 0);

  return (
    <section className={classnames(styles.section, "pt-25")}>
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
            <div className={classnames(styles.element, "pb-4")} key={element.id}>
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
    </section>
  );
};
