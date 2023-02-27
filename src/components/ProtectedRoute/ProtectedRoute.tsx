import { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../services/selectors/auth";

interface IProtectedRouteProps extends PropsWithChildren {
  onlyUnAuth: boolean;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: IProtectedRouteProps) => {
  const user = useSelector(getUserInfo);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user?.name && !onlyUnAuth) {
    navigate("/login", { state: { from: location.pathname } });
  } else if (onlyUnAuth && user?.name) {
    navigate(location?.state?.from || "/");
  } else {
    return children;
  }
};
