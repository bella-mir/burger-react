import { useState } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profilePage.module.css";

export const ProfilePage = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <NavLink
            // className={cn(styles.nav, "text text_type_main-medium")}
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? cn(styles.nav, styles.navActive, "text text_type_main-medium")
                : cn(styles.nav, "text text_type_main-medium")
            }
          >
            Профиль
          </NavLink>
          <NavLink
            className={cn(styles.nav, "text text_type_main-medium")}
            to="#"
          >
            История заказов
          </NavLink>
          <NavLink
            className={cn(styles.nav, "text text_type_main-medium")}
            to="#"
          >
            Выход
          </NavLink>
          <span className={cn("pt-20", styles.comment)}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
        <div className={styles.info}>
          <Input
            onChange={onChange}
            value={value}
            name={"Name"}
            placeholder="Имя"
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            // autocomplete={false}
          />
          <Input
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder="Email"
            isIcon={true}
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            // autocomplete={false}
          />
          <PasswordInput
            onChange={onChange}
            value={value}
            name={"password"}
            placeholder="Пароль"
            extraClass="mb-2"
            contentEditable={true}
            // autocomplete="off"
          />
        </div>
      </div>
    </div>
  );
};
