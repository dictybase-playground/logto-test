import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"
import { Header } from "./Header"
import { Navigation } from "./Navigation"

const Layout = () => (
  <Container sx={{ padding: "2rem" }}>
    <Header />
    <Navigation />
    <div>
      <Outlet />
    </div>
  </Container>
)

export { Layout }
