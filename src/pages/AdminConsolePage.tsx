import { PrivateRouteHandler } from "../PrivateRouteHandler"

const AdminConsolePage = () => (
  <div>
    <h1> Admin Console </h1>
  </div>
)

export default <PrivateRouteHandler allowedRoles={["administrator"]} page={<AdminConsolePage />} />