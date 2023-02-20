import cn from "classnames";
import { useForm } from "../../hooks/use-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/actions/auth";
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
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ ...controlInput?.values })).then(() => {
      navigate(location?.state?.from || "/");
    });
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Вход</div>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          onChange={controlInput.handleChange}
          value={controlInput?.values?.email || ''}
          name={"email"}
          placeholder="Email"
          isIcon={true}
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={controlInput.handleChange}
          value={controlInput?.values?.password || ''}
          name={"password"}
          placeholder="Пароль"
          extraClass="mb-2"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Войти
        </Button>
      </form>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Вы - новый пользователь?
          <Link className={styles.link} to="/register">
            {` Зарегистрироваться`}
          </Link>
        </div>
        <div>
          Забыли пароль?
          <Link className={styles.link} to="/forgot-password">
            {` Восстановить пароль`}
          </Link>
        </div>
      </div>
    </div>
  );
};
