import { useLogto } from "@logto/react";
import { usePermify } from "@permify/react-role"

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
    <button onClick={onClick}>
      Sign out
    </button>
  )
}

export { LogOutButton }