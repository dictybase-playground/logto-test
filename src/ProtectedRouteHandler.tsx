import { useEffect, type ReactNode, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { Role, type RouteMap } from "./constants";
import { pipe, flow, apply } from "fp-ts/lib/function";
import { head, map as arrMap, filter as arrFilter, sequence } from "fp-ts/Array";
import { of as TEof,getOrElse, tryCatchK, fold as TEfold, ApplicativePar } from "fp-ts/TaskEither";
import { of as Tof, map as Tmap } from "fp-ts/Task"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { orderRoles, asyncAuthorizationFunction, isRoleAuthorized } from "./utils";
import { RoleNames } from "./constants";

type ProtectedRouteHandlerProperties = {
  roles: Array<Role>;
};

const ProtectedRouteHandler = ({ roles }: ProtectedRouteHandlerProperties) => {
  const navigate = useNavigate();
  const { isAuthorized } = usePermify();
  useEffect(() => {
    const authNavigation = async () => {
      const getAuthorizedRole = pipe(
        roles,
        arrMap(asyncAuthorizationFunction(isAuthorized)),
        sequence(ApplicativePar),
        getOrElse(() => pipe(roles, arrMap((role) => ({ role, authorization: false })), Tof)),
        Tmap(
          flow(
            arrFilter(({ authorization }) => authorization),
            arrMap(({ role }) => role),
            orderRoles,
            head,
            OgetOrElse(() => RoleNames.BASIC)
          ),
        )
      )
      navigate(await getAuthorizedRole())
  }
    authNavigation();
  }, [isAuthorized, navigate, roles]);

  return <Outlet />;
};

export { ProtectedRouteHandler };
