import { createBrowserRouter } from "react-router-dom"
import { Root } from "./Root"
import { Callback } from "./Callback"
import InfoPage from "./pages/InfoPage"
import AdminConsolePage from "./pages/AdminConsolePage"

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
  },
  {
    path: "/console",
    element: AdminConsolePage
  }
])

export { router }