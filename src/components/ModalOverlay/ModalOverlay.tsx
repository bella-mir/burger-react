import React, { useCallback, useEffect, KeyboardEvent } from "react";
import styles from "./modal-overlay.module.scss";

interface IModalOverlay {
  setIsOpen: (set: boolean) => void;
}

export const ModalOverlay = ({ setIsOpen }: IModalOverlay) => {
  const escFunction = useCallback(
    (event: KeyboardEvent<Element>) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    //@ts-ignore
    document.addEventListener("keydown", escFunction);
    return () => {
      //@ts-ignore
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
