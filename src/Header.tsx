import { Stack, Typography, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { LogInOutButton } from "./LogInOutButton";
import { Link } from "react-router-dom";

const Header = () => {
  console.log("header")
  return (
    <Stack direction="row" justifyContent="space-between">
      <Link to="/">
        <Typography variant="h3"> Auth App </Typography>
      </Link>
      <Stack direction="row" alignItems="baseline">
        <Link to="/user">
          <IconButton>
            <PersonIcon sx={{ color: "white" }}/>
          </IconButton>
        </Link>
        <LogInOutButton />
      </Stack>
    </Stack>
    )
}

export { Header }