import { useEffect, type ReactNode, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { orderRoles, authorizeRole } from "./utils";
import { Role, type RouteMap } from "./constants";
import { pipe } from "fp-ts/lib/function";
import { map as arrMap } from "fp-ts/Array";

type ProtectedRouteHandlerProperties = {
  roles: Array<Role>;
};

const ProtectedRouteHandler = ({ roles }: ProtectedRouteHandlerProperties) => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  useEffect(() => {
    const authNavigation = async () => {
      pipe(roles, orderRoles, arrMap(authorizeRole(isAuthorized)));
    };
    authNavigation();
  }, [isAuthorized, navigate, roles]);

  return <Outlet />;
};

export { ProtectedRouteHandler };
