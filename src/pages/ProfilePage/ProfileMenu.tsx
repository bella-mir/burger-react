import cn from "classnames";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/auth";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./profilePage.module.scss";
import { AppDispatch } from "../../services/store";

export const ProfileMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const refreshToken: string | null = localStorage.getItem("refreshToken");

  const handleLogout = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser({ refreshToken })).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className={styles.menu}>
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          isActive
            ? cn(styles.nav, styles.navActive, "text text_type_main-medium")
            : cn(styles.nav, "text text_type_main-medium")
        }
      >
        Профиль
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? cn(styles.nav, styles.navActive, "text text_type_main-medium")
            : cn(styles.nav, "text text_type_main-medium")
        }
        to="/profile/orders"
      >
        История заказов
      </NavLink>
      <NavLink
        to=""
        className={cn(styles.nav, "text text_type_main-medium")}
        onClick={handleLogout}
      >
        Выход
      </NavLink>
      <span className={cn("pt-20", styles.comment)}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </div>
  );
};
