import React, { useCallback } from "react";
import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ setIsOpen, children }) => {
  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
      onKeyDown={escFunction}
      tabIndex="0"
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
