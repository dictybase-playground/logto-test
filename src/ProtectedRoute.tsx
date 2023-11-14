import { HasAccess } from "@permify/react-role";
import { Forbidden } from "./Forbidden";
import { Outlet, Navigate } from "react-router-dom";
import { Role } from "./constants";

type ProtectedRouteProperties = {
  allowedRoles: Array<Role>;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProperties) => {
  return (
    <HasAccess
      roles={allowedRoles}
      renderAuthFailed={<Forbidden />}
      isLoading={<> Loading </>}>
      <Outlet />
    </HasAccess>
  );
};

export { ProtectedRoute };
