import React, { useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "../Modal/Modal";
import { AppHeader } from "../AppHeader";
import { ProtectedRoute } from "../ProtectedRoute";
import { IngredientDetails } from "../IngredientDetails";
import {
  Main,
  IngredientPage,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
} from "../../pages";
import { fetchIngredients } from "../../services/slices/ingredients";
import { getUserData } from "../../services/actions/auth";
import styles from "./app.module.scss";
import { AppDispatch } from "../../services/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchIngredients());
    //@ts-ignore
    dispatch(getUserData());
  }, [dispatch]);

  const handleModalClose = useCallback(
    (isOpen: boolean) => {
      !isOpen && navigate(-1);
    },
    [navigate]
  );

  return (
    <div className={styles.page}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal header={"Детали ингредиента"} setIsOpen={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
