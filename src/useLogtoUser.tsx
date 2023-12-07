import { useState, useEffect } from "react"
import { useLogto, UserInfoResponse } from "@logto/react"
import { type Option, fromNullable, none } from "fp-ts/Option"

const useLogtoUser = () => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const [user, setUser] = useState<Option<UserInfoResponse>>(none)
  console.log("user loading", isLoading)
  useEffect(() => {
    const handleUserInformation = async () => {
      if (isAuthenticated) {
        const authUser = await fetchUserInfo()
        setUser(fromNullable(authUser))
      }
    }
    handleUserInformation()
  }, [fetchUserInfo, isAuthenticated, user])

  return { user, isLoading }
}

export { useLogtoUser }
