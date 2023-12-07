import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { Role } from "./constants";
import { Loader } from "./Loader"
import { pipe, flow } from "fp-ts/lib/function";
import {
  head,
  map as arrMap,
  filter as arrFilter,
  sequence,
} from "fp-ts/Array";
import { getOrElse, ApplicativePar } from "fp-ts/TaskEither";
import { of as Tof, map as Tmap } from "fp-ts/Task";
import { getOrElse as OgetOrElse } from "fp-ts/Option";
import { orderRoles, asyncAuthorizationFunction } from "./utils";
import { RoleNames } from "./constants";

type ProtectedRouteHandlerProperties = {
  roles: Array<Role>;
};

const ProtectedRouteHandler = ({ roles }: ProtectedRouteHandlerProperties) => {
  const navigate = useNavigate();
  const { isAuthorized, isLoading } = usePermify();
  const [resolvedPath, setResolvedPath] = useState("")
  useEffect(() => {
    const authNavigation = async () => {
      const getAuthorizedRole = pipe(
        roles,
        arrMap(asyncAuthorizationFunction(isAuthorized)),
        sequence(ApplicativePar),
        getOrElse(() =>
          pipe(
            roles,
            arrMap((role) => ({ role, authorization: false })),
            Tof,
          ),
        ),
        Tmap(
          flow(
            arrFilter(({ authorization }) => authorization),
            arrMap(({ role }) => role),
            orderRoles,
            head,
            OgetOrElse(() => RoleNames.BASIC),
          ),
        ),
      );
      setResolvedPath(await getAuthorizedRole())
    };

    authNavigation();
  }, [isAuthorized, navigate, roles]);

  if (isLoading) return <Loader />  
  return <Navigate to={resolvedPath} replace />;
};

export { ProtectedRouteHandler };
