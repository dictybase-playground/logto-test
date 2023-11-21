import { useEffect, type ReactNode, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { orderRoles, asyncAuthorizationFunction } from "./utils";
import { Role, type RouteMap } from "./constants";
import { pipe, flow, apply } from "fp-ts/lib/function";
import { map as arrMap, filter as arrFilter } from "fp-ts/Array";
import { getOrElse, tryCatchK } from "fp-ts/lib/TaskEither";

type ProtectedRouteHandlerProperties = {
  roles: Array<Role>;
};

const ProtectedRouteHandler = ({ roles }: ProtectedRouteHandlerProperties) => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  useEffect(() => {
    const authNavigation = async () => {
      const authorizationFunction = pipe(
        isAuthorized,
        asyncAuthorizationFunction,
      )
      const TEauthFn = tryCatchK(authorizationFunction, () => false)
      const filterAuthorizedRoles =
        // const authorizationFunction = flow(isAuthorized, asyncAuthorizationFunction)
        pipe(
          roles,
          orderRoles,
          arrFilter(flow(TEauthFn, getOrElse(() =>)))
        );
    };
    authNavigation();
  }, [isAuthorized, navigate, roles]);

  return <Outlet />;
};

export { ProtectedRouteHandler };
