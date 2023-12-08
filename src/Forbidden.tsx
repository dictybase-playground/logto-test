import { Navigate } from "react-router-dom"
import { useTimer } from "./useTimer"
import { Typography, Stack } from "@mui/material"

const formatTime = (time: number) => {
  const milliseconds = Math.trunc((time % 1000) / 10)
  const seconds = Math.floor(time / 1000)

  return `${seconds}:${milliseconds}`
}

const Forbidden = () => {
  const { remainingTime } = useTimer(10)

  if (remainingTime <= 0) return <Navigate to="/" />
  return (
    <Stack>
      <Typography variant="h2" color="error">
        ERROR!
      </Typography>
      <Typography color="error">
        YOU ARE UNAUTHORIZED TO VIEW THIS PAGE.
      </Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "10rem" }}>
        <Typography variant="h4">You will be removed in:</Typography>
        <Typography variant="h4">{formatTime(remainingTime)}</Typography>
      </Stack>
    </Stack>
  )
}

export { Forbidden }
