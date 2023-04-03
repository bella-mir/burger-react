import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { useAppDispatch as useDispatch } from "../../app/hooks";
import cn from "classnames";
import styles from "./burgerConstructor.module.scss";
import {
  deleteFromConstructor,
  reorderIngredients,
} from "../../services/actions/ingredients";
import { IConstructorProps } from "../../services/types";

interface IBurgerElementProps {
  index: number;
  element: IConstructorProps;
}

export const BurgerElement = ({ index, element }: IBurgerElementProps) => {
  const dispatch = useDispatch();
  const id = element.elementId;

  const divRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const [{ handlerID }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerID: monitor.getHandlerId(),
      };
    },
    //@ts-ignore
    hover(item: { index: number }, monitor) {
      if (!divRef.current) {
        return;
      }
      const sourceIndex = item.index;
      const destinationIndex = index;
      if (sourceIndex === destinationIndex) {
        return;
      }
      const hoverBoundingRect = divRef.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.bottom - hoverBoundingRect.top;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : null;
      if (hoverClientY) {
        if (sourceIndex < destinationIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (sourceIndex > destinationIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      dispatch(reorderIngredients([sourceIndex, destinationIndex]));
      item.index = destinationIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(divRef));

  return (
    <div
      className={cn(styles.element, "pb-4", isDragging && styles.dragged)}
      ref={divRef}
      data-handler-id={handlerID}
      key={element.elementId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={() => dispatch(deleteFromConstructor(element))}
      />
    </div>
  );
};
