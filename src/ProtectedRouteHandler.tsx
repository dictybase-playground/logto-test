import { useEffect, type ReactNode, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { type Role, type RouteMap } from "./constants";


type ProtectedRouteHandlerProperties = {
  roles: Array<Role>
}

const ProtectedRouteHandler = ({ roles }: ProtectedRouteHandlerProperties) => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  console.log(roles)
  useEffect(() => {
    const authNavigation = async () => {
      // Assuming a user will only have a single role
      let rolePath = "basic"
      for (let i = 0; i < roles.length; i++) {
        if (await isAuthorized([roles[i]])) {
          rolePath = roles[i]
        }
      }
      navigate(rolePath)
    };
    authNavigation();
  }, [isAuthorized, navigate, roles]);

  return <Outlet />;
};

export { ProtectedRouteHandler };
