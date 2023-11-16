import { pipe } from "fp-ts/function";
import { filter } from "fp-ts/Array";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteHandler } from "./ProtectedRouteHandler";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { ProtectedAdmin, ProtectedBasic } from "./pages/protected";
import { Layout } from "./Layout";
import { Root } from "./Root";
import { Callback } from "./Callback";
import { ProtectedRoute } from "./ProtectedRoute";

type RouteObject = {};

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

// const filterProtectedRouter = (routes: Array<) => {};

const routeDefinitions = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Root /> },
      { path: "/callback", element: <Callback /> },
      { path: "/example-public", element: <> Public Page </> },
      {
        path: "/example-protected",
        children: [
          {
            index: true,
            element: <ProtectedRouteHandler roles={["administrator", "basic"]} />,
          },
          {
            path: "administrator",
            element: <ProtectedRoute allowedRoles={["administrator"]} />,
            children: [{ index: true, element: <ProtectedAdmin /> }],
          },
          {
            path: "basic",
            element: <ProtectedBasic />,
          },
        ],
      },
      {
        path: "/example-private",
        children: [
          {
            index: true,
            element: <PrivateRouteHandler />,
          },
          {
            path: "administrator",
            element: <ProtectedRoute allowedRoles={["administrator"]} />,
            children: [{ index: true, element: <ProtectedAdmin /> }],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routeDefinitions);

export { router };
