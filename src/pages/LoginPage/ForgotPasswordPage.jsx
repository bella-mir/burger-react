import { useForm } from "../../hooks/use-form";
import cn from "classnames";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";
import { resetPassword } from "../../utils/api";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const controlInput = useForm();

  const handleResetPassword = (e) => {
    e.preventDefault();
    controlInput?.values.email &&
      resetPassword(controlInput.values.email).then(
        (response) =>
          response.success === true &&
          navigate("/reset-password", { state: { from: location.pathname } })
      );
  };

  return (
    <div className={styles.content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <form onSubmit={handleResetPassword} className={styles.form}>
        <Input
          onChange={controlInput.handleChange}
          value={controlInput?.values?.email || ''}
          name={"email"}
          placeholder="Укажите email"
          extraClass="mb-2"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Воccтановить
        </Button>
      </form>
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
