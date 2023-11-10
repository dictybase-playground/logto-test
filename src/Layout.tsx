import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <h1>Auth App</h1>
    <div>
      <Outlet />
    </div>
  </div>
);

export { Layout };
