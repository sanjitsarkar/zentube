import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = true;

  return isLoggedIn === true ? children : <Navigate to="/" replace />;
};
export default PrivateRoute;
