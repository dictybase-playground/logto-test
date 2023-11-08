import { ReactChild } from "react"
import { HasAccess } from "@permify/react-role"
import { Role } from "./constants"

type PrivateRouteHandlerProperties = {
  allowedRoles: Array<Role>
  page: ReactChild
}

const PrivateRouteHandler = ({ allowedRoles, page }: PrivateRouteHandlerProperties) => {
  return (
    <HasAccess 
      roles={allowedRoles}
      renderAuthFailed={<p> Forbidden </p>}
      isLoading={<p> is Loading </p>}>
        {page}
    </HasAccess>
  )
}

export { PrivateRouteHandler }