import { useAuth } from "../../hooks/use-auth";
import { useForm } from "../../hooks/use-form";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";

export const SignUpPage = () => {
  const controlInput = useForm();
  const auth = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password, name } = controlInput.values;
    auth.signup(email, password, name);
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Регистрация</div>
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
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="ml-2"
        onCLick={handleSignUp}
      >
        Зарегистрироваться
      </Button>
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
