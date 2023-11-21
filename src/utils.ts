import { Ord as numOrd } from "fp-ts/number";
import { of as arrOf, sort as arrSort, filter as arrFilter } from "fp-ts/Array";
import {
  getOrElse,
  of as TEof,
  tryCatchK as TEtryCatchK,
} from "fp-ts/lib/TaskEither";
import { pipe, apply } from "fp-ts/function";
import { Role, rolePriority } from "./constants";
import { fromCompare } from "fp-ts/lib/Ord";
import { type PermifyAuthContext } from "@permify/react-role/dist/PermifyContext";

type AsyncRoleAuthorization = {
  _tag: "asyncAuth";
  role: Role;
  authorization: Promise<boolean>;
};

type RoleAuthorization = {
  _tag: "auth";
  role: Role;
  authorization: boolean;
};

const compareRoles = (a: Role, b: Role) =>
  numOrd.compare(rolePriority[a], rolePriority[b]);

const roleOrd = apply(compareRoles)(fromCompare);

const orderRoles = apply(roleOrd)(arrSort);

const TEisAuthorized =
  (asyncAuthFn: PermifyAuthContext["isAuthorized"]) =>
  async (roles: Array<Role>) => {
    const isAuthorized = await asyncAuthFn(roles);
    return isAuthorized;
  };

const asyncAuthorizationFunction =
  (isAuthorized: PermifyAuthContext["isAuthorized"]) => async (role: Role) =>
    pipe(role, arrOf, isAuthorized);

export { orderRoles, asyncAuthorizationFunction };
