import { HasAccess } from "@permify/react-role";
import { Outlet } from "react-router-dom";
import { Role } from "./constants";

type ProtectedRouteProperties = {
  allowedRoles: Array<Role>;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProperties) => {
  console.log("protected route", allowedRoles);
  return (
    <HasAccess
      roles={allowedRoles}
      renderAuthFailed={<> forbidden </>}
      isLoading={<> Loading </>}>
      <Outlet />
    </HasAccess>
  );
};

export { ProtectedRoute };
