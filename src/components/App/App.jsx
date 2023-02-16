import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredients";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";
import { ProtectedRouteElement } from "../ProtectedRouteElement";
import { ProvideAuth } from "../../hooks/use-auth";
import {
  Main,
  IngredientPage,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from "../../pages";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import styles from "./app.module.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = useCallback(
    (isOpen) => {
      !isOpen && navigate("/");
    },
    [navigate]
  );

  const tokenCheck = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
      navigate(location.pathname);
    } else {
      console.log("ERROR");
    }
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <ProvideAuth>
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route
            exact
            path="/ingredients/:ingredientId"
            element={<IngredientPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal
                  header={"Детали ингредиента"}
                  setIsOpen={handleModalClose}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </ProvideAuth>
    </div>
  );
};

export default App;
