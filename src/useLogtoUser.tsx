import { useState, useEffect } from "react"
import { useLogto, UserInfoResponse } from "@logto/react"
import { type Option, fromNullable, none } from "fp-ts/Option"

const useLogtoUser = () => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const [user, setUser] = useState<Option<UserInfoResponse>>(none)
  console.log("user loading", isLoading)
  useEffect(() => {
    const handleUserInformation = async () => {
      const authUser = await fetchUserInfo()
      if (isAuthenticated) {
        setUser(fromNullable(authUser))
      }
    }
    handleUserInformation()
  }, [fetchUserInfo, isAuthenticated])

  return { user, isLoading }
}

export { useLogtoUser }
