import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector as useSelector } from "../../app/hooks";
import { getUserInfo } from "../../services/selectors/auth";

interface IProtectedRouteProps extends PropsWithChildren {
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: IProtectedRouteProps): JSX.Element => {
  const user = useSelector(getUserInfo);
  const location = useLocation();

  if (!user?.name && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  } else if (onlyUnAuth && user?.name) {
    return <Navigate to={location?.state?.from || "/"} />;
  } else {
    return <>{children}</>;
  }
};
