import { useLogto } from "@logto/react"
import { IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import { LogInButton } from "./LogInButton"
import { LogOutButton } from "./LogOutButton"

const LogInOutButton = () => {
  const { isAuthenticated } = useLogto()

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/user">
            <IconButton>
              <PersonIcon sx={{ color: "white" }} />
            </IconButton>
          </Link>
          <LogOutButton />
        </>
      ) : (
        <LogInButton />
      )}
    </>
  )
}

export { LogInOutButton }
