import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root"
import { Callback } from "./Callback"
import InfoPage from "./pages/InfoPage"

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
    element: InfoPage
  }
])

export { router }