import { Container } from "@mui/material"
import { useLogto } from "@logto/react"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"
import { useEffect } from "react"

const Root = () => {
  const { isAuthenticated, fetchUserInfo } = useLogto()
  console.log("rerendering")

  return (
    <Container>{isAuthenticated ? <LogOutButton /> : <LogInButton />}</Container>
  )
}

export { Root }