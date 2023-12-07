import { useLogtoUser } from "./useLogtoUser"

const User = () => {
  const { user } = useLogtoUser()

  return <div>User</div>
}

export { User }
