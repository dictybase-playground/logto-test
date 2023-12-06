import { useLogto } from '@logto/react'
import { Button } from '@mui/material';

const LogInButton = () => {
  const { signIn } = useLogto();

  return (
    <Button onClick={() => signIn('http://localhost:5173/callback')}>
      Sign In
    </Button>
  )
}

export { LogInButton  }