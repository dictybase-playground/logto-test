import { FunctionComponent } from "react";
import { pipe } from "fp-ts/function";
import { Ord } from "fp-ts/string";
import { left, right } from "fp-ts/Either";
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record";
import {
  head,
  append as arrAppend,
  reduce as arrReduce,
  filter as arrFilter,
  map as arrMap,
  separate,
  concat,
} from "fp-ts/Array";
import {
  match,
  Do,
  bind,
  let as Olet,
  getOrElse,
  isSome,
  of,
} from "fp-ts/Option";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ACCESS, Role } from "./constants";
import { ProtectedRouteHandler } from "./ProtectedRouteHandler";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { ProtectedAdmin, ProtectedBasic } from "./pages/protected";
import { Layout } from "./Layout";
import { Root } from "./Root";
import { Callback } from "./Callback";
import { ProtectedRoute } from "./ProtectedRoute";

type RoleComponent = [Role, JSX.Element];

type ProtectedRouteMap = Array<RoleComponent>;

type PublicPageData = {
  default: FunctionComponent;
  access: ACCESS;
};

type ProtectedPageData = {
  access: ACCESS;
  routeMap: ProtectedRouteMap;
};

type PageComponentData = PublicPageData | ProtectedPageData;

type dynamicRouteProperties = Record<string, PageComponentData>;

const isPublicPageData = (
  pageData: PageComponentData,
): pageData is PublicPageData => pageData.access === ACCESS.public;

const isProtectedPageData = (
  pageData: PageComponentData,
): pageData is ProtectedPageData => pageData.access === ACCESS.protected;

type dynamicRoutesProperties = Record<string, PageComponentData>;

const dynamicRoutes: dynamicRoutesProperties = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
);

const pathParts = (path: string) =>
  path
    .replaceAll(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replaceAll(/\[(\w+)]/g, ":$1");

const mapToPublicRouteObject = (route: string, value: PublicPageData) => {
  const PageComponent = value.default;
  return { path: pathParts(route), element: <PageComponent /> };
};

const isRole = (x: unknown): x is Role =>
  x === Role.ADMINISTRATOR || x === Role.CURATOR || x === Role.BASIC;

const mapToProtectedRouteObject = (route: string, value: ProtectedPageData) => {
  // Protected route consists of a public subroute and private subroutes
  const availableRoles = pipe(
    value.routeMap,
    arrMap(head),
    arrFilter(isSome),
    arrMap((a) => a.value),
    arrFilter(isRole),
  );
  const eitherRoleRoutes = (roleComponent: RoleComponent) =>
    roleComponent[0] === Role.BASIC
      ? left(roleComponent)
      : right(roleComponent);
  const roleRoutes = pipe(value.routeMap, arrMap(eitherRoleRoutes), separate);
  const publicRoutes = pipe(
    roleRoutes.left,
    arrMap((a) => ({ path: a[0], element: a[1] })),
  );
  const protectedRoutes = pipe(
    roleRoutes.right,
    arrMap((a) => ({
      path: a[0],
      element: <ProtectedRoute allowedRoles={[a[0]]} />,
      children: Array.of({ index: true, element: a[1] }),
    })),
  );
  const children = concat(publicRoutes)(protectedRoutes);
  return {
    path: pathParts(route),
    element: <ProtectedRouteHandler roles={availableRoles} />,
    children,
  };
};

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter(isPublicPageData),
    Rcollect(Ord)(mapToPublicRouteObject),
  );

const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter(isProtectedPageData),
    Rcollect(Ord)(mapToProtectedRouteObject),
  );

const buildMergedRoutes = ({
  publicR,
  protectedR,
}: {
  publicR: Array<RouteObject>;
  protectedR: Array<RouteObject>;
}) => pipe(publicR, concat(protectedR));

const createRouteDefinition = (allRoutes: dynamicRouteProperties) =>
  pipe(
    Do,
    Olet("publicR", () => pipe(allRoutes, publicRoutes)),
    Olet("protectedR", () => pipe(allRoutes, protectedRoutes)),
    Olet("mergedR", buildMergedRoutes),
    Olet("finalRoutes", ({ mergedR }) =>
      pipe({ element: <Layout />, children: mergedR }, Array.of),
    ),
    match(
      () => [],
      ({ finalRoutes }) => finalRoutes,
    ),
  );

const routeDefinitions = createRouteDefinition(dynamicRoutes);
console.log(routeDefinitions);
const router = createBrowserRouter(routeDefinitions);

// const routeDefinitions = [
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Root /> },
//       { path: "/callback", element: <Callback /> },
//       { path: "/example-public", element: <> Public Page </> },
//       {
//         path: "/example-protected",
//         children: [
//           {
//             index: true,
//             element: (
//               <ProtectedRouteHandler roles={["administrator", "basic"]} />
//             ),
//           },
//           {
//             path: "administrator",
//             element: <ProtectedRoute allowedRoles={["administrator"]} />,
//             children: [{ index: true, element: <ProtectedAdmin /> }],
//           },
//           {
//             path: "basic",
//             element: <ProtectedBasic />,
//           },
//         ],
//       },
//       {
//         path: "/example-private",
//         children: [
//           {
//             index: true,
//             element: <PrivateRouteHandler />,
//           },
//           {
//             path: "administrator",
//             element: <ProtectedRoute allowedRoles={["administrator"]} />,
//             children: [{ index: true, element: <ProtectedAdmin /> }],
//           },
//         ],
//       },
//     ],
//   },
// ];
export { router };
