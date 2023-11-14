import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { usePermify } from "@permify/react-role";

const ProtectedRouteHandler = () => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  const [route, setRoute] = useState("");

  useEffect(() => {
    const authNavigation = async () => {
      // replace with functional pattern
      if (await isAuthorized(["administrator"])) {
        setRoute("administrator");
      } else {
        setRoute("basic");
      }
    };
    authNavigation();
  }, [isAuthorized, navigate]);

  return <Navigate to={route} />;
};

export { ProtectedRouteHandler };
