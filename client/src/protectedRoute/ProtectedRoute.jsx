import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserProvider/UserContext";


function ProtectedRoute({ element, redirectTo }) {

 const { isAdmin } = useContext(UserContext);

  if (isAdmin) {

    return element;

  } else {

    return <Navigate to={redirectTo} />;
  }
}

export default ProtectedRoute;
