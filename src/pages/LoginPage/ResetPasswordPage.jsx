import { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const ResetPasswordPage = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <PasswordInput
        onChange={onChange}
        value={value}
        name={"password"}
        placeholder="Введите новый пароль"
        extraClass="mb-2"
        // autocomplete="off"
      />
      <Input
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Введите код из письма"
        isIcon={true}
        extraClass="mb-2"
        // autocomplete={false}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
        Сохранить
      </Button>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вспомнили пароль?
          <Link className={styles.link} to='/login'> Войти</Link>
        </div>
      </div>
    </div>
  );
};
