import { match } from "ts-pattern"
import { type ReactNode } from "react"
import { useLogto } from "@logto/react"

type Role = "curator" | "administrator" | "basic"

type RouterHandlerProperties = {
  roleViews: Array<{ role: Role; component: ReactNode }>
}

const RouteHandler = ({ roleViews }: RouterHandlerProperties) => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  // 
  // get roles, then match the view accordingly 
  const fetchUser = async () => {
    if (!isAuthenticated) return
    const userData = await fetchUserInfo()
    return userData
  }
  fetchUser()
  
  return match({isLoading, roleViews}).with({isLoading: true}, () => <> Loading</>).otherwise(() => <></>)
}

export { RouteHandler }