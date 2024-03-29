import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useAppDispatch as useDispatch } from "../../app/hooks";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import cn from "classnames";
import { useAppSelector as useSelector } from "../../app/hooks";
import {
  addToConstructor,
  deleteAllFromConstructor,
} from "../../services/actions/ingredients";
import { postOrder } from "../../services/slices/order";
import { getIngredientsInConstructor } from "../../services/selectors/ingredients";
import bun from "../../../src/asserts/loading.svg";
import { nanoid } from "@reduxjs/toolkit";
import { BurgerElement } from "./BurgerElement";
import { getUserInfo } from "../../services/selectors/auth";
import { IIngredientProp } from "../../services/types";
import styles from "./burgerConstructor.module.scss";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);
  const navigate = useNavigate();
  const isAuth = Boolean(user?.name);
  const selectedIngredients = useSelector(getIngredientsInConstructor);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredientProp) {
      dispatch(addToConstructor({ ...item, elementId: nanoid() }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (selectedIngredients?.bun?.name) {
      setIsDisabled(() => false);
    }
  }, [selectedIngredients?.bun?.name]);

  const selectedBunsIds = selectedIngredients.bun
    ? [selectedIngredients.bun._id, selectedIngredients.bun._id]
    : undefined;

  const selectedIngredientsIds =
    selectedIngredients.ingredients &&
    selectedIngredients.ingredients.map(
      (ingredient: IIngredientProp) => ingredient._id
    );

  const sum =
    selectedIngredients.ingredients &&
    selectedIngredients.ingredients.reduce(
      (accumulator: number, element: IIngredientProp) => {
        return accumulator + element.price;
      },
      0
    ) +
      (selectedIngredients?.bun?.price
        ? selectedIngredients?.bun?.price * 2
        : 0);

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleClick = () => {
    if (isAuth && selectedIngredientsIds && selectedBunsIds) {
      setIsOpen(true);
      dispatch(postOrder(selectedIngredientsIds.concat(selectedBunsIds)));
      dispatch(deleteAllFromConstructor());
    } else {
      redirectToLogin();
    }
  };

  return (
    <div ref={dropTarget}>
      <section className={cn(styles.section, "pt-25 pr-2")}>
        {(selectedIngredients?.ingredients &&
          selectedIngredients?.ingredients?.length > 0) ||
        selectedIngredients?.bun?._id ? (
          <>
            <div className={styles.main}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={
                  selectedIngredients?.bun?.name
                    ? `${selectedIngredients.bun.name} (верх)`
                    : "Не забудьте выбрать булочку"
                }
                price={
                  selectedIngredients?.bun?.price
                    ? selectedIngredients?.bun?.price
                    : 0
                }
                thumbnail={
                  selectedIngredients?.bun?.image_mobile
                    ? selectedIngredients.bun.image_mobile
                    : bun
                }
              />
              <div className={styles.inner}>
                {selectedIngredients.ingredients &&
                selectedIngredients.ingredients.length > 0 ? (
                  selectedIngredients.ingredients.map(
                    (element: IIngredientProp, index: number) => (
                      <BurgerElement
                        element={element}
                        index={index}
                        key={element.elementId}
                      />
                    )
                  )
                ) : (
                  <p
                    className={cn(
                      styles.emptyArea,
                      "text text_type_main-medium pb-6"
                    )}
                  >
                    переместите сюда начинку
                  </p>
                )}
              </div>

              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={
                  selectedIngredients?.bun?.name
                    ? `${selectedIngredients.bun.name} (низ)`
                    : "Не забудьте выбрать булочку"
                }
                price={
                  selectedIngredients?.bun?.price
                    ? selectedIngredients?.bun?.price
                    : 0
                }
                thumbnail={
                  selectedIngredients?.bun?.image_mobile
                    ? selectedIngredients.bun.image_mobile
                    : bun
                }
              />
            </div>

            <section className={cn(styles.count, "pt-10")}>
              <div className={cn(styles.sum, "pr-10")}>
                <p className="text text_type_digits-medium">{sum}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={handleClick}
                disabled={isDisabled}
              >
                Оформить заказ
              </Button>
            </section>
          </>
        ) : (
          <p
            className={cn(styles.emptyArea, "text text_type_main-medium pb-6")}
          >
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
