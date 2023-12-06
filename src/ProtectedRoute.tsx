import { HasAccess } from "@permify/react-role";
import { Forbidden } from "./Forbidden";
import { Outlet } from "react-router-dom";
import { Role } from "./constants";
import { Loader } from "./Loader";

type ProtectedRouteProperties = {
  allowedRoles: Array<Role>;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProperties) => {
  return (
    <HasAccess
      roles={allowedRoles}
      renderAuthFailed={<Forbidden />}
      isLoading={<Loader />}>
      <Outlet />
    </HasAccess>
  );  
};

export { ProtectedRoute };
