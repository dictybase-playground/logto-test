import { useState, useEffect } from "react"
import { useLogto } from "@logto/react"
import { type Role } from "./constants"

const useRoles = () => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const [roles, setRoles] = useState<Array<Role>>([])

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return
      const userData = await fetchUserInfo()
      const roles = userData.roles
      setRoles(roles)
    }
    fetchUser(
  }, [fetchUserInfo, isAuthenticated])
  
  return { isLoading, roles }
}

export { useRoles }