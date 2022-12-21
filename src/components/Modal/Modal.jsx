import React from "react";
import * as ReactDOM from "react-dom";
import styles from "./modal.module.css";
import classnames from "classnames";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root");

export const Modal = ({ header, setIsOpen, children }) => {
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
            <div className={styles.close}>
              <CloseIcon
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
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
