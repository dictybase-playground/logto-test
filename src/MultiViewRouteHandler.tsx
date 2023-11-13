import { match } from "ts-pattern";
import { type ReactNode } from "react";
import { useRoles } from "./useRoles";
import { Unauthorized } from "./Unauthorized";

type MultiViewRouteHandlerProperties = {
  roleViews: { [role: string]: ReactNode };
};

const MultiViewRouteHandler = ({
  roleViews,
}: MultiViewRouteHandlerProperties) => {
  const { isLoading, roles } = useRoles();
  return match({ isLoading, roles })
    .with({ isLoading: true }, () => <> Loading </>)
    .when(
      () => roles.includes("administrator") && roleViews.administrator,
      () => roleViews.administrator,
    )
    .when(
      () => roles.includes("curator") && roleViews.curator,
      () => roleViews.curator,
    )
    .when(
      () => roles.includes("basic") && roleViews.basic,
      () => roleViews.basic,
    )
    .otherwise(() => <></>);
};

[
  {
    path: "/info",
    children: [
      { index: true, element: <RoleChecker /> },
      { path: "/unauthorized", element: <UnauthorizedInfo /> },
      { path: "/authorized", element: <AuthorizedInfo /> },
    ],
  },
];

("/info/admin");

export { MultiViewRouteHandler };
