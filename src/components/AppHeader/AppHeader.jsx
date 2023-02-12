import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./appHeader.module.css";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  //temporary solution to disable some links
  const handleDisabledClick = (e) => {
    e.preventDefault();
  };

  return (
    <header className={cn(styles.header, "pl-5 pr-5 pb-5 pt-5")}>
      <nav className={styles.menu}>
        <div className={styles.menuGroup}>
          <NavLink
            to="/"
            end
            className={cn(styles.menuElement, "text text_type_main-default")}
            style={({ isActive }) => ({
              color: isActive ? "#F2F2F3" : "#8585AD",
            })}
          >
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink
            to="/lenta"
            className={cn(
              styles.menuElement,
              styles.navDisabled,
              "text text_type_main-default"
            )}
            style={({ isActive }) => ({
              color: isActive ? "#F2F2F3" : "#8585AD",
            })}
            onClick={handleDisabledClick}
          >
            <ListIcon type="secondary" />
            Лента заказов
          </NavLink>
        </div>

        <Logo />

        <NavLink
          to="/profile"
          className={cn(styles.menuElement, "text text_type_main-default")}
          style={({ isActive }) => ({
            color: isActive ? "#F2F2F3" : "#8585AD",
          })}
        >
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavLink>
      </nav>
    </header>
  );
};
