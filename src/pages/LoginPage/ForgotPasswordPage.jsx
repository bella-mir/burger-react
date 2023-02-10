import { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const ForgotPasswordPage = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <Input
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Укажите email"
        isIcon={true}
        extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
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
