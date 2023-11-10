import { pipe } from "fp-ts/function";
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record";
import { Ord } from "fp-ts/string";
import { append as Arpend } from "fp-ts/Array";
import { type FunctionComponent } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { Root } from "./Root";
import { Callback } from "./Callback";
import { Role } from "./constants";

type PageComponentData = {
  default: FunctionComponent;
  allowedRoles: Array<Role>;
};
type mergedRoutesProperties = {
  publicR: Array<RouteObject>;
  protectedR: Array<RouteObject>;
};
type dynamicRoutesProperties = Record<string, PageComponentData>;

const dynamicRoutes: dynamicRoutesProperties = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
);

const pathParts = (path: string) =>
  path
    .replaceAll(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replaceAll(/\[(\w+)]/g, ":$1");

const mapToRouteObject = (route: string, value: PageComponentData) => {
  const PageComponent = value.default;
  return { path: pathParts(route), element: <PageComponent /> };
};

const mapToPrivateRouteObject = (route: string, value: PageComponentData) => {
  const PageComponent = value.default;
  const { allowedRoles } = value;
  return {
    path: pathParts(route),
    element: (
      <PrivateRouteHandler
        allowedRoles={allowedRoles}
        page={<PageComponent />}
      />
    ),
  };
};

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.allowedRoles === undefined),
    Rcollect(Ord)(mapToRouteObject),
  );

const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => !!v.allowedRoles),
    Rcollect(Ord)(mapToPrivateRouteObject),
  );

const buildMergedRoutes = ({ publicR, protectedR }: mergedRoutesProperties) =>
  pipe(
    publicR,
    Arpend(protectedR as RouteObject),
    Arpend({ path: "/callback", element: <Callback /> } as RouteObject),
    Arpend({ path: "/", element: <Root /> } as RouteObject),
  );

// const routerDefinition =
export { router };
