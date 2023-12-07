import { useState, useEffect } from "react"
import { useLogto, UserInfoResponse } from "@logto/react"
import { type Option, fromNullable, none } from "fp-ts/Option"

const useLogtoUser = () => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const [user, setUser] = useState<Option<UserInfoResponse>>(none)
  useEffect(() => {
    const handleUserInformation = async () => {
      if (isAuthenticated) {
        const authUser = await fetchUserInfo()
        setUser(fromNullable(authUser))
      }
    }
    handleUserInformation()
  }, [fetchUserInfo, isAuthenticated])

  return { user, isLoading, isAuthenticated }
}

export { useLogtoUser }
