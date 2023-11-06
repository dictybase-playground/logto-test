import { Container } from "@mui/material"
import { useLogto } from "@logto/react"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"

const Root = () => {
  const { isAuthenticated } = useLogto()

  return (
    <Container>{isAuthenticated ? <LogOutButton /> : <LogInButton />}</Container>
  )
}

export { Root }