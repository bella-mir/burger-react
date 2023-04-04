import { useState, useCallback } from "react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../app/hooks";
import { updateUserData } from "../../services/actions/auth";
import { useForm } from "../../hooks/use-form";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profilePage.module.scss";
import { getUserInfo } from "../../services/selectors/auth";
import { ProfileMenu } from "./ProfileMenu";

export const ProfilePage = () => {
  const controlInput = useForm();
  const dispatch = useDispatch();
  const [isEditing, enableEditing] = useState(false);
  const user = useSelector(getUserInfo);

  const onCancelClick = useCallback(() => {
    controlInput.resetForm();
    enableEditing(false);
  }, [controlInput]);

  const onSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData({ ...controlInput?.values }));
    enableEditing(false);
  };

  const onEditClick = () => {
    enableEditing(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ProfileMenu />
        <div className={styles.info}>
          <form onSubmit={onSaveClick} className={styles.form}>
            <Input
              onChange={controlInput.handleChange}
              value={controlInput.values?.name || user?.name}
              name={"name"}
              placeholder="Имя"
              extraClass="mb-2"
              contentEditable={true}
              icon={"EditIcon"}
              disabled={!isEditing}
              onIconClick={onEditClick}
            />
            <Input
              onChange={controlInput.handleChange}
              value={controlInput.values?.email || user?.email}
              name={"email"}
              placeholder="Email"
              extraClass="mb-2"
              contentEditable={true}
              icon={"EditIcon"}
              disabled={!isEditing}
              onIconClick={onEditClick}
            />
            <Input
              onChange={controlInput.handleChange}
              name={"password"}
              placeholder="Пароль"
              extraClass="mb-2"
              contentEditable={true}
              icon={"EditIcon"}
              disabled={!isEditing}
              onIconClick={onEditClick}
              value={controlInput?.values?.password || ""}
            />
            <div className={styles.buttons}>
              {isEditing && (
                <>
                  <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={onCancelClick}
                    disabled={!isEditing}
                  >
                    Отмена
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!isEditing}
                  >
                    Сохранить
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
