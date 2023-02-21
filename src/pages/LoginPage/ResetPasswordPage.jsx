import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/use-form";
import cn from "classnames";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updatePassword } from "../../utils/api";
import styles from "./loginPage.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const controlInput = useForm();
  const location = useLocation();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    controlInput?.values &&
      dispatch(
        updatePassword({
          email: controlInput.values.password,
          token: controlInput.values.token,
        })
      );
  };

  return location.state?.from !== "/forgot-password" ? (
    <Navigate to={0} />
  ) : (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <form onSubmit={handleUpdatePassword} className={styles.form}>
        <PasswordInput
          onChange={controlInput.handleChange}
          value={controlInput?.values?.password || ""}
          name={"password"}
          placeholder="Введите новый пароль"
          extraClass="mb-2"
        />
        <Input
          onChange={controlInput.handleChange}
          value={controlInput?.values?.token || ""}
          name={"token"}
          placeholder="Введите код из письма"
          extraClass="mb-2"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Сохранить
        </Button>
      </form>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            {` Войти`}
          </Link>
        </div>
      </div>
    </div>
  );
};
