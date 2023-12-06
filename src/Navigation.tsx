import { Stack, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Navigation = () => {
  const navigate  = useNavigate()
  return <Stack direction="row">
    <Button onClick={() => navigate("/public")}> Public Route </Button>
    <Button onClick={() => navigate("/protected")}> Protected Route </Button>
  </Stack>
}

export { Navigation }