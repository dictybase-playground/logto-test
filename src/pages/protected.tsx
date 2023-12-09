import { ACCESS } from "../constants"
import { RoleNames, RouteMap } from "../constants"

const ProtectedBasic = () => <> Hello Basic User! </>

const ProtectedAdmin = () => {
  return <> Hello, Administrator. </>
}

const access = ACCESS.protected

const routeMap: RouteMap = [
  [RoleNames.ADMINISTRATOR, <ProtectedAdmin />],
  [RoleNames.BASIC, <ProtectedBasic />],
]

export { ProtectedBasic, ProtectedAdmin, access, routeMap }
