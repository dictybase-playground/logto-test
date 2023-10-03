import { useLogto } from '@logto/react'

const LogInButton = () => {
  const { signIn } = useLogto();

  return (
    <button onClick={() => signIn('http://localhost:5173/callback')}>
      Sign In
    </button>
  )
}

export { LogInButton  }