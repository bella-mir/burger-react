import React, { useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { IngredientPropTypes } from "../utils/propTypes";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./burgerConstructor.module.css";
import { useSelector } from "react-redux";
import { addToConstructor } from "../../services/actions/ingredients";
import { postOrder } from "../../services/slices/order";
import { getIngredientsInConstructor } from "../../services/selectors/ingredients";
import bun from "../../../src/asserts/bun.svg";
import { nanoid } from "@reduxjs/toolkit";
import { BurgerElement } from "./BurgerElement";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(getIngredientsInConstructor);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addToConstructor({ ...item, elementId: nanoid() }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [isOpen, setIsOpen] = useState(false);

  const selectedIngredientsIds =
    selectedIngredients.ingredients &&
    selectedIngredients.ingredients.map((ingredient) => ingredient._id);

  const sum =
    selectedIngredients.ingredients.reduce((accumulator, element) => {
      return accumulator + element.price;
    }, 0) + (selectedIngredients.bun?.price * 2 || 0);

  const handleClick = () => {
    setIsOpen(true);
    dispatch(postOrder(selectedIngredientsIds));
  };

  return (
    <div ref={dropTarget}>
      <section className={classnames(styles.section, "pt-25 pr-2")}>
        {selectedIngredients.ingredients.length > 0 ||
        selectedIngredients.bun._id ? (
          <>
            <div className={styles.main}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={
                  selectedIngredients.bun.name
                    ? `${selectedIngredients.bun.name} (верх)`
                    : "Не забудьте выбрать булочку"
                }
                price={selectedIngredients.bun.price}
                thumbnail={
                  selectedIngredients.bun.image_mobile
                    ? selectedIngredients.bun.image_mobile
                    : bun
                }
              />
              <div className={styles.inner}>
                {selectedIngredients.ingredients.length > 0 ? (
                  selectedIngredients.ingredients.map((element, index) => (
                    <BurgerElement
                      key={element.elementId}
                      element={element}
                      index={index}
                      id={element._id}
                    />
                  ))
                ) : (
                  <p className="text text_type_main-medium pb-6">
                    Переместите сюда начинку
                  </p>
                )}
              </div>

              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={
                  selectedIngredients.bun.name
                    ? `${selectedIngredients.bun.name} (низ)`
                    : "Не забудьте выбрать булочку"
                }
                price={selectedIngredients.bun.price}
                thumbnail={
                  selectedIngredients.bun.image_mobile
                    ? selectedIngredients.bun.image_mobile
                    : bun
                }
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
        ) : (
          <p className="text text_type_main-medium pb-6">
            Переместите сюда ингредиенты для бургера
          </p>
        )}
      </section>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} header={""}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  burgerData: PropTypes.arrayOf(IngredientPropTypes),
};
