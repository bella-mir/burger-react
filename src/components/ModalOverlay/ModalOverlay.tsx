import React, { useCallback, useEffect } from "react";
import styles from "./modal-overlay.module.scss";

export const ModalOverlay = ({ setIsOpen }: any) => {
  const escFunction = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
      onKeyDown={escFunction}
      tabIndex={0}
    ></div>
  );
};
