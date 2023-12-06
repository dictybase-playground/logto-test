import { Stack, Typography } from "@mui/material";
import { LogInOutButton } from "./LogInOutButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Link to="/">
        <Typography variant="h3"> Auth App </Typography>
      </Link>
      <LogInOutButton />
    </Stack>
    )
}

export { Header }