import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteHandler } from "./ProtectedRouteHandler";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { ProtectedAdmin, ProtectedBasic } from "./pages/protected";
import { Layout } from "./Layout";
import { Root } from "./Root"
import { Callback } from "./Callback";
import { ProtectedRoute } from "./ProtectedRoute";


const routeDefinitions = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Root />},
      { path: "/callback", element: <Callback />},
      {
        path: "/protected",
        children: [
          {
            index: true,
            element: <ProtectedRouteHandler />,
          },
          {
            path: "administrator",
            element: <ProtectedRoute allowedRoles={["administrator"]} />,
            children: [{ index: true, element: <ProtectedAdmin />}]
          },
          {
            path: "basic",
            element: <ProtectedBasic />,
          },
        ]
      },
      {
        path: "/private",
        children: [
          {
            index: true,
            element: <PrivateRouteHandler />,
          },
          {
            path: "administrator",
            element: <ProtectedRoute allowedRoles={["administrator"]} />,
            children: [{ index: true, element: <ProtectedAdmin />}]
          },
        ]
      },
    ]
  },
]

const router = createBrowserRouter(routeDefinitions)

export { router }