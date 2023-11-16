import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { usePermify } from "@permify/react-role"

const PrivateRouteHandler = () => {
  const navigate = useNavigate()
  const { isAuthorized } = usePermify()
  useEffect(() => {
    const authNavigation = async () => {
      if (await isAuthorized(["administrator"])) {
        console.log("is admin")
        navigate("administrator")
      } else { 
        navigate("/")
      }
    }
    authNavigation()
  }, [isAuthorized, navigate])

  return (
    <Outlet />
  )
}

export { PrivateRouteHandler }