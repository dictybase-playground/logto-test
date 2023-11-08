import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"
import { router } from "./Routes"
import './App.css'
import { PermifyInitializer } from "./PermifyInitializer"

function App() {
  return (
    <AuthProvider>
      <PermifyInitializer />
        <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
