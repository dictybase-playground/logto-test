import { FunctionComponent } from "react";
import { pipe } from "fp-ts/function";
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record";
import { Ord } from "fp-ts/string";
import { getOrElse } from "fp-ts/lib/Option";
import { filter as arrFilter, map as arrMap, head } from "fp-ts/Array";
import { createBrowserRouter } from "react-router-dom";
import { ACCESS, Role } from "./constants";
import { ProtectedRouteHandler } from "./ProtectedRouteHandler";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { ProtectedAdmin, ProtectedBasic } from "./pages/protected";
import { Layout } from "./Layout";
import { Root } from "./Root";
import { Callback } from "./Callback";
import { ProtectedRoute } from "./ProtectedRoute";

type PublicComponentData = {
  default: FunctionComponent;
  access: ACCESS;
};

type ProtectedComponentData = {
  access: ACCESS;
  routeMap: Array<[Role, JSX.Element]>;
};

type PageComponentData = PublicComponentData | ProtectedComponentData;

type dynamicRoutesProperties = Record<string, PublicComponentData>;

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

const mapToPublicRouteObject = (route: string, value: PublicComponentData) => {
  const PageComponent = value.default;
  return { path: pathParts(route), element: <PageComponent /> };
};

const mapToProtectedRouteObject = (
  route: string,
  value: ProtectedComponentData,
) => {
  const publicRoute = pipe(
    value.routeMap,
    arrFilter((a) => a[0] === "basic"),
  );
  const children = pipe(value.routeMap, arrMap(mapProtectedChildrenRoutes));
  const roles = pipe(value.routeMap, arrMap(head));
  return {
    path: pathParts(route),
    element: <ProtectedRouteHandler />,
    children,
  };
};

const mapProtectedChildrenRoutes = (routeMap: [Role, FunctionComponent]) => {
  if (routeMap[0] === "basic")
    return { path: routeMap[0] as Role, element: routeMap[1] };
  return {
    path: routeMap[0] as Role,
    element: <ProtectedRoute allowedRoles={[routeMap[0]]} />,
    children: routeMap[1],
  };
};

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.public),
    Rcollect(Ord)(mapToRouteObject),
  );

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

const router = createBrowserRouter(routeDefinitions);

export { router };
