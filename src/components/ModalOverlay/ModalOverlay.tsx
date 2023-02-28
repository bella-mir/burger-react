import React, { useEffect } from "react";
import styles from "./modal-overlay.module.scss";

interface IModalOverlay {
  setIsOpen: (set: boolean) => void;
}

export const ModalOverlay = ({ setIsOpen }: IModalOverlay) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [setIsOpen]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
      tabIndex={0}
    ></div>
  );
};
