import { useLogto } from "@logto/react"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"

const LogInOutButton = () => {
  const { isAuthenticated } = useLogto()
  
  return (
    <>{isAuthenticated ? <LogOutButton /> : <LogInButton />}</>
  )
}

export { LogInOutButton }