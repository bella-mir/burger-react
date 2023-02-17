import cn from "classnames";
import { useForm } from "../../hooks/use-form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../../services/selectors/auth";
import { loginUser } from "../../services/actions/auth";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const LoginPage = () => {
  const controlInput = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getAuthStatus);

  const handleLogin = () => {
    dispatch(loginUser({ ...controlInput?.values }));
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [navigate, status]);

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Вход</div>
      <Input
        onChange={controlInput.handleChange}
        value={controlInput?.values?.email}
        name={"email"}
        placeholder="Email"
        isIcon={true}
        extraClass="mb-2"
      />
      <PasswordInput
        onChange={controlInput.handleChange}
        value={controlInput?.values?.password}
        name={"password"}
        placeholder="Пароль"
        extraClass="mb-2"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="ml-2"
        onClick={handleLogin}
      >
        Войти
      </Button>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вы - новый пользователь?
          <Link className={styles.link} to="/register">
            Зарегистрироваться
          </Link>
        </div>
        <div>
          Забыли пароль?
          <Link className={styles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};
