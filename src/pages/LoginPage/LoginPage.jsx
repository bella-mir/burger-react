import { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const LoginPage = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Вход</div>
      <Input
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Email"
        isIcon={true}
        extraClass="mb-2"
        // autocomplete={false}
      />
      <PasswordInput
        onChange={onChange}
        value={value}
        name={"password"}
        placeholder="Пароль"
        extraClass="mb-2"
        // autocomplete="off"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
        Войти
      </Button>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вы - новый пользователь?{" "}
          <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
        </div>
        <div>
          Забыли пароль?
          <Link className={styles.link} to='/forgot-password'> Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
};
