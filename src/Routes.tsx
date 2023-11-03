import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root"
import { Callback } from "./Callback"
import { RouteHandler } from "./RouteHandler"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/callback",
    element: <Callback />
  },
  {
    path: "/info",
    element: <RouteHandler />
  }
])

export { router }