import { useSelector } from "react-redux";
import { Route, Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = (props) => {
  const login = useSelector((state) => state.user.loginStatus);
 
  const location = useLocation();
  console.log("loc.pathname", location.pathname);

  return login ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};
