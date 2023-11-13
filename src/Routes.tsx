import { pipe } from "fp-ts/function";
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record";
import { Ord } from "fp-ts/string";
import { append as Arpend, concat } from "fp-ts/Array";
import { bind, let as Olet, of, Do, match } from "fp-ts/Option";
import { ReactNode, type FunctionComponent } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { PrivateRouteHandler } from "./PrivateRouteHandler";
import { MultiViewRouteHandler } from "./MultiViewRouteHandler";
import { Root } from "./Root";
import { Layout } from "./Layout";
import { Callback } from "./Callback";
import { Role } from "./constants";

type PageComponentData = {
  default: FunctionComponent;
  allowedRoles: Array<Role>;
};

type MultiViewComponentData = {
  roleViews: { [role: string]: ReactNode };
};

type mergedRoutesProperties = {
  publicR: Array<RouteObject>;
  protectedR: Array<RouteObject>;
  multiR: Array<RouteObject>;
};
type dynamicRoutesProperties = Record<string, PageComponentData>;
type multiViewRouteProperties = Record<string, MultiViewComponentData>;

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

const mapToMultiViewRouteObject = (
  route: string,
  value: MultiViewComponentData,
) => {
  const { roleViews } = value;
  console.log(roleViews);
  return {
    path: pathParts(route),
    element: <MultiViewRouteHandler roleViews={roleViews} />,
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

const multiViews = (allRoutes: multiViewRouteProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => !!v.roleViews),
    Rcollect(Ord)(mapToMultiViewRouteObject),
  );

const buildMergedRoutes = ({
  publicR,
  protectedR,
  multiR,
}: mergedRoutesProperties) =>
  pipe(
    publicR,
    concat(protectedR),
    concat(multiR),
    Arpend({ path: "/callback", element: <Callback /> } as RouteObject),
    Arpend({ index: true, element: <Root /> } as RouteObject),
  );

const createRouteDefinition = (allRoutes: dynamicRoutesProperties) =>
  pipe(
    Do,
    bind("publicR", () => pipe(allRoutes, publicRoutes, of)),
    bind("protectedR", () => pipe(allRoutes, protectedRoutes, of)),
    bind("multiR", () => pipe(allRoutes, multiViews, of)),
    Olet("mergedR", buildMergedRoutes),
    Olet("finalRoutes", ({ mergedR }) =>
      pipe({ element: <Layout />, children: mergedR }, Array.of),
    ),
    match(
      () => [],
      ({ finalRoutes }) => finalRoutes,
    ),
  ) as Array<RouteObject>;

const router = createBrowserRouter(createRouteDefinition(dynamicRoutes));


const roleViews = {
  curator: <BasicView />,
  administrator: <AdminView />,
  basic: <BasicView />,
  none: <> Welcome to dictyBase! If you have an account, please log in. </>,
};

routes = [
  {
    path: "/info",
    element: <MultiViewRouteHandler roleViews={roleViews} 
  }
]
export { router };
