import { useEffect } from "react"
import { usePermify } from "@permify/react-role"
import { useLogto } from "@logto/react"
import './App.css'

const PermifyInitializer = () => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const { setUser } = usePermify()
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return
      const userData = await fetchUserInfo()
      if(!userData) return
      setUser({ 
        id: userData.sub,
        roles: userData.roles
      })
    }
    fetchUser()
  }, [fetchUserInfo, isAuthenticated, setUser])
  

  return <></>
}

export { PermifyInitializer }
