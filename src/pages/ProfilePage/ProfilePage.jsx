import cn from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUserData } from "../../services/actions/auth";
import { useForm } from "../../hooks/use-form";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profilePage.module.css";
import { getUserInfo } from "../../services/selectors/auth";

export const ProfilePage = () => {
  const controlInput = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, enableEditing] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");
  const user = useSelector(getUserInfo);

  const handleLogout = () => {
    dispatch(logoutUser({ refreshToken }));

    navigate("/login");
  };

  //temporary solution to disable some links
  const handleDisabledClick = (e) => {
    e.preventDefault();
  };

  const onCancelClick = () => {
    enableEditing(false);
  };

  const onSaveClick = () => {
    dispatch(updateUserData({ ...controlInput?.values }));
    enableEditing(false);
  };

  const onEditClick = () => {
    enableEditing(true);
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
            className={cn(styles.nav, "text text_type_main-medium")}
            onClick={handleLogout}
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
            value={controlInput.values ? controlInput.values.name : user?.name}
            name={"name"}
            placeholder="Имя"
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            disabled={!isEditing}
            onIconClick={onEditClick}
          />
          <Input
            onChange={controlInput.handleChange}
            value={
              controlInput.values ? controlInput.values.email : user?.email
            }
            name={"email"}
            placeholder="Email"
            isIcon={true}
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            disabled={!isEditing}
            onIconClick={onEditClick}
          />
          <Input
            onChange={controlInput.handleChange}
            name={"password"}
            placeholder="Пароль"
            extraClass="mb-2"
            contentEditable={true}
            icon={"EditIcon"}
            disabled={!isEditing}
            onIconClick={onEditClick}
          />
          <div className={styles.buttons}>
            {isEditing && (
              <>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="medium"
                  onClick={onCancelClick}
                  disabled={!isEditing}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="medium"
                  disabled={!isEditing}
                  onClick={onSaveClick}
                >
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
