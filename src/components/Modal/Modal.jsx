import React from "react";
import * as ReactDOM from "react-dom";
import styles from "./modal.module.css";
import classnames from "classnames";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root");

export const Modal = ({ header, setIsOpen, children }) => {
  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={classnames(styles.modal)}>
        <div className="pl-10 pr-10 pb-15 pt-10">
          <div className={styles.header}>
            <p className="text text_type_main-large">{header}</p>
            <button
              className={styles.close}
              onClick={() => {
                setIsOpen(false);
              }}
            ></button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  setIsOpen: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};
