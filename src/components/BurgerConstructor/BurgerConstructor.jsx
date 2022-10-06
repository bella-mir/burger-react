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
  const upperPart = data[0];
  const lowerPart = data[data.length - 1];
  const innerParts = data.slice(1, -1);

  const sum = data.reduce((accumulator, element) => {
    return accumulator + element.price;
  }, 0);

  return (
    <section className={classnames(styles.section, "pt-25")}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={upperPart.name}
          price={upperPart.price}
          thumbnail={upperPart.image_mobile}
        />
        <div className={styles.inner}>
          {innerParts.map((element) => (
            <div className={classnames(styles.element, "pb-4")}>
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
          text={lowerPart.name}
          price={lowerPart.price}
          thumbnail={lowerPart.image_mobile}
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
