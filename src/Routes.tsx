import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root"
import { Callback } from "./Callback"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/callback",
    element: <Callback />
  }
])

export { router }