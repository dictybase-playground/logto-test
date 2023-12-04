import { Ord as numOrd } from "fp-ts/number";
import { of as arrOf, sort as arrSort, filter as arrFilter } from "fp-ts/Array";
import {
  Do,
  bind,
  getOrElse,
  of as TEof,
  tryCatchK as TEtryCatchK,
  tryCatch as TEtryCatch,
  map as TEmap,
  left
} from "fp-ts/TaskEither";
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

// type RoleAuthorizationError = <E>{
//   _tag: "authError";
//   role: Role;
//   error: E
// };

const compareRoles = (a: Role, b: Role) =>
  numOrd.compare(rolePriority[a], rolePriority[b]);

const roleOrd = apply(compareRoles)(fromCompare);

const orderRoles = apply(roleOrd)(arrSort);

// const resolveAuthorization = (asyncRoleAuthorization: AsyncRoleAuthorization): RoleAuthorization => {
//   return pipe(TEtryCatch(asyncRoleAuthorization))
// }

const asyncAuthorizationFunction =
  (isAuthorized: PermifyAuthContext["isAuthorized"]) => (role: Role) =>
  pipe(
    Do,
    bind("role", () => TEof(role)),
    bind("authorization", () => pipe(role, arrOf, TEtryCatchK(isAuthorized, () => new Error("Authorization Error")))))

const isRoleAuthorized =
  (isAuthorized: PermifyAuthContext["isAuthorized"]) => (role: Role) =>
   pipe(role, arrOf, TEtryCatchK(isAuthorized, (error) => error))

// const asyncFilter = <A>(asyncPredicate: (x: A) => Promise<boolean>) => async (array: Array<A>): Array<A> => {
//   const 
// } 
  
export { orderRoles, asyncAuthorizationFunction, isRoleAuthorized };
  