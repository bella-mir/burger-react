import cn from "classnames";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "../../hooks/use-form";
import { NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profilePage.module.css";

export const ProfilePage = () => {
  const controlInput = useForm();
  const auth = useAuth();

  //temporary solution to disable some links
  const handleDisabledClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <NavLink
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
            className={cn(
              styles.nav,
              styles.navDisabled,
              "text text_type_main-medium"
            )}
            to="/profile/orders"
            onClick={handleDisabledClick}
          >
            История заказов
          </NavLink>
          <NavLink
            className={cn(
              styles.nav,
              styles.navDisabled,
              "text text_type_main-medium"
            )}
            to="profile/orders/:id"
            onClick={auth.signout}
          >
            Выход
          </NavLink>
          <span className={cn("pt-20", styles.comment)}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
        <div className={styles.info}>
          <Input
            onChange={controlInput.handleChange}
            value={auth?.user?.name}
            name={"name"}
            placeholder="Имя"
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            disabled={true}
            onIconClick={controlInput.handleDisabled}
          />
          <EmailInput
            onChange={controlInput.handleChange}
            value={auth?.user?.email}
            name={"email"}
            placeholder="Email"
            isIcon={true}
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            disabled={true}
            onIconClick={controlInput.handleDisabled}
          />
          <PasswordInput
            onChange={controlInput.handleChange}
            value={auth?.user?.password}
            name={"password"}
            placeholder="Пароль"
            extraClass="mb-2"
            contentEditable={true}
            disabled={true}
            onIconClick={controlInput.handleDisabled}
          />
        </div>
      </div>
    </div>
  );
};
