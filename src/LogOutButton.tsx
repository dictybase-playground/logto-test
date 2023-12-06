import { useLogto } from "@logto/react";
import { usePermify } from "@permify/react-role"
import { Button } from "@mui/material"

const LogOutButton = () => {
  const { signOut } = useLogto();
  const { setUser } = usePermify()

  const onClick = () => {
    setUser({
      id: "",
      roles: []
    })
    signOut('http://localhost:5173')
  }
  
  return (
    <Button onClick={onClick}>
      Sign out
    </Button>
  )
}

export { LogOutButton }