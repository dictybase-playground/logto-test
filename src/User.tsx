import { Stack, Typography } from "@mui/material"
import { useOutletContext } from "react-router-dom"
import { UserContext } from "./PrivateRouteHandler"

const User = () => {
  const { user } = useOutletContext<UserContext>()

  return (
    <Stack>
      <Typography> {user?.name} </Typography>
      <Typography> {user?.email} </Typography>
    </Stack>
  )
}

export { User }
