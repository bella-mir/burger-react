import React from "react";
import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default ModalOverlay;
