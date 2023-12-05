import { Ord as numOrd } from "fp-ts/number";
import { of as arrOf, sort as arrSort } from "fp-ts/Array";
import {
  Do,
  bind,
  of as TEof,
  tryCatchK as TEtryCatchK,
} from "fp-ts/TaskEither";
import { pipe, apply } from "fp-ts/function";
import { Role, rolePriority } from "./constants";
import { fromCompare } from "fp-ts/lib/Ord";
import { type PermifyAuthContext } from "@permify/react-role/dist/PermifyContext";
import { RoleNames } from "./constants";

const compareRoles = (a: Role, b: Role) =>
  numOrd.compare(rolePriority[a], rolePriority[b]);

const roleOrd = apply(compareRoles)(fromCompare);

const orderRoles = apply(roleOrd)(arrSort);

const asyncAuthorizationFunction =
  (isAuthorized: PermifyAuthContext["isAuthorized"]) => (role: Role) =>
  pipe(
    Do,
    bind("role", () => TEof(role)),
    bind("authorization", () => pipe(role, arrOf, TEtryCatchK(isAuthorized, () => new Error("Authorization Error")))))

const isRoleAuthorized =
  (isAuthorized: PermifyAuthContext["isAuthorized"]) => (role: Role) =>
   pipe(role, arrOf, TEtryCatchK(isAuthorized, (error) => error))

const isRole = (x: unknown): x is RoleNames =>
   x === RoleNames.ADMINISTRATOR || x === RoleNames.CURATOR || x === RoleNames.BASIC;
 

export { orderRoles, asyncAuthorizationFunction, isRoleAuthorized, isRole };
  