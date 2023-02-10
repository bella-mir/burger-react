import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredients";
import { Routes, Route } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";
import { Main, IngredientPage, LoginPage, SignUpPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from "../../pages";
import styles from "./app.module.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
      </Routes>
    </div>
  );
};

export default App;
