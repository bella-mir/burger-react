import React, { useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch as useDispatch } from "../../app/hooks";
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
  FeedPage,
} from "../../pages";
import { fetchIngredients } from "../../services/slices/ingredients";
import { getUserData } from "../../services/actions/auth";
import styles from "./app.module.scss";
import { OrderPage } from "../../pages/OrderPage/OrderPage";
import { OrderDetails } from "../../pages/FeedPage/components/OrderDetails";
import { ProfileOrders } from "../../pages/ProfilePage/ProfileOrders";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());
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
            <ProtectedRoute onlyUnAuth={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:orderId"
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderId" element={<OrderPage />} />
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
          <Route
            path="/feed/:orderId"
            element={
              <Modal header={""} setIsOpen={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:orderId"
            element={
              <Modal header={""} setIsOpen={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
