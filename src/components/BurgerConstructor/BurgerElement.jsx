import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { IngredientPropTypes } from "../../utils/propTypes";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./burgerConstructor.module.css";
import {
  deleteFromConstructor,
  reorderIngredients,
} from "../../services/actions/ingredients";

export const BurgerElement = ({ index, element }) => {
  const dispatch = useDispatch();
  const id = element.elementId;

  const divRef = useRef(null);

  const [{ handlerID }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerID: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      className={classnames(
        styles.element,
        "pb-4",
        isDragging && styles.dragged
      )}
      ref={divRef}
      data-handler-id={handlerID}
      index={index}
    >
      <DragIcon />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={() => dispatch(deleteFromConstructor(element.elementId))}
      />
    </div>
  );
};

BurgerElement.propTypes = {
  index: PropTypes.number.isRequired,
  element: IngredientPropTypes.isRequired,
};
