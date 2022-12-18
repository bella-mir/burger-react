import React from "react";
import { useDispatch } from "react-redux";
import { selectIngredient } from "../../services/actions/ingredients";
import * as ReactDOM from "react-dom";
import styles from "./modal.module.css";
import classnames from "classnames";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root");

export const Modal = ({ header, setIsOpen, children }) => {
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <>
      <ModalOverlay setIsOpen={setIsOpen} />
      <div
        className={classnames(styles.modal)}
        tabIndex="0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pl-10 pr-10 pb-15 pt-10">
          <div className={styles.header}>
            <p className="text text_type_main-large">{header}</p>
            <button
              className={styles.close}
              onClick={() => {
                dispatch(selectIngredient(""));
                setIsOpen(false);
              }}
            ></button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
