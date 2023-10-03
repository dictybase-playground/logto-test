import { useLogto } from "@logto/react";

const LogOutButton = () => {
  const { signOut } = useLogto();

  return (
    <button onClick={() => signOut('http://localhost:5173')}>
      Sign out
    </button>
  )
}

export { LogOutButton }