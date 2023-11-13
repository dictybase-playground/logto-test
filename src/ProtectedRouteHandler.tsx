import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { usePermify } from "@permify/react-role";

const ProtectedRouteHandler = () => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  useEffect(() => {
    const authNavigation = async () => {
      // replace with functional pattern
      if (await isAuthorized(["administrator"])) {
        console.log("is admin");
        navigate("administrator");
      } else {
        navigate("basic");
      }
    };
    authNavigation();
  }, [isAuthorized, navigate]);

  return <></>;
};

export { ProtectedRouteHandler };
