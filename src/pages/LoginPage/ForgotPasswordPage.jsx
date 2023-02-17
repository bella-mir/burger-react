import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/use-form";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";
import { resetPassword } from "../../utils/api";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const controlInput = useForm();

  const handleResetPassword = () => {
    controlInput?.values.email &&
      dispatch(resetPassword(controlInput.values.email));
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <Input
        onChange={controlInput.handleChange}
        value={controlInput?.values?.email}
        name={"email"}
        placeholder="Укажите email"
        isIcon={true}
        extraClass="mb-2"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="ml-2"
        onClick={handleResetPassword}
      >
        Воccтановить
      </Button>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вспомнили пароль?{" "}
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
