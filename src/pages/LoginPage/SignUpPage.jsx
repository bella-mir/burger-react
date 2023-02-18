import { useForm } from "../../hooks/use-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../../services/selectors/auth";
import { useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { signupUser } from "../../services/actions/auth";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const controlInput = useForm();
  const status = useSelector(getAuthStatus);

  const handleSignUp = () => {
    dispatch(signupUser({ ...controlInput?.values }));
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [navigate, status]);

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Регистрация</div>
      <form onSubmit={handleSignUp} className={styles.form}>
        <Input
          onChange={controlInput.handleChange}
          value={controlInput?.values?.name}
          name={"name"}
          placeholder="Имя"
          contentEditable={true}
          extraClass="mb-2"
        />
        <Input
          onChange={controlInput.handleChange}
          value={controlInput?.values?.email}
          name={"email"}
          placeholder="Email"
          isIcon={true}
          contentEditable={true}
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
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={cn(styles.questions, "mt-15")}>
        <div>
          Уже зарегистрировались?
          <Link className={styles.link} to="/login">
            {" "}
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
