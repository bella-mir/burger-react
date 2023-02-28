import React from "react";
import * as ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root");

type TModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  header: string;
  children: React.ReactNode;
};

export const Modal = ({ header, setIsOpen, children }: TModalProps) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay setIsOpen={setIsOpen} />
      <div
        className={styles.modal}
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pl-10 pr-10 pb-15 pt-10">
          <div className={styles.header}>
            <p className="text text_type_main-large">{header}</p>
            <div className={styles.close}>
              <CloseIcon
                type="primary"
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
    modalRoot as HTMLDivElement
  );
};
