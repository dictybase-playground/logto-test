import { FunctionComponent } from "react";
import { pipe } from "fp-ts/function";
import { Ord } from "fp-ts/string";
import { left, right } from "fp-ts/Either";
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record";
import {
  of as Aof,
  head,
  filter as arrFilter,
  map as arrMap,
  separate,
  concat,
} from "fp-ts/Array";
import {
  match,
  Do,
  let as Olet,
  isSome,
} from "fp-ts/Option";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ACCESS, RoleNames } from "./constants";
import { isRole } from "./utils"
import { ProtectedRouteHandler } from "./ProtectedRouteHandler";
import { PrivateRouteHandler } from "./PrivateRouteHandler"
import { Layout } from "./Layout";
import { ProtectedRoute } from "./ProtectedRoute";

type RoleComponent = [RoleNames, JSX.Element];

type ProtectedRouteMap = Array<RoleComponent>;

type PublicPageData = {
  default: FunctionComponent;
  access: ACCESS;
};

type  PrivatePageData = PublicPageData

type ProtectedPageData = {
  access: ACCESS;
  routeMap: ProtectedRouteMap;
};

type PageComponentData = PublicPageData | ProtectedPageData;

type dynamicRouteProperties = Record<string, PageComponentData>;

const isPublicPageData = (
  pageData: PageComponentData,
): pageData is PublicPageData => pageData.access === ACCESS.public;

const isPrivatePageData = (
  pageData: PageComponentData,
): pageData is PublicPageData => pageData.access === ACCESS.private;

const isProtectedPageData = (
  pageData: PageComponentData,
): pageData is ProtectedPageData => pageData.access === ACCESS.protected;

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

const mapToPublicRouteObject = (route: string, value: PublicPageData) => {
  const PageComponent = value.default;
  return { path: pathParts(route), element: <PageComponent /> };
};

const mapToPrivateRouteObject = (route: string, value: PrivatePageData): RouteObject => {
  const PageComponent = value.default;
  return { path: pathParts(route), element: <PrivateRouteHandler />, children: [{index: true, element: <PageComponent />} ] };
}

const mapToProtectedRouteObject = (route: string, value: ProtectedPageData): RouteObject => {
  /**
   * Array<[RoleName, JSX.Element] -> Array<RoleName>
   * 
   * an array of rolenames to be passed into the `ProtectedRouterHandler` componenet
   */
  const availableRoles = pipe(
    value.routeMap,
    arrMap(head),
    arrFilter(isSome),
    arrMap((a) => a.value),
    arrFilter(isRole),
  );

  /**
   * Separate the protected subroutes from the public subroute
   */
  const eitherRoleRoutes = (roleComponent: RoleComponent) =>
    roleComponent[0] === RoleNames.BASIC
      ? left(roleComponent)
      : right(roleComponent);
  const roleRoutes = pipe(value.routeMap, arrMap(eitherRoleRoutes), separate);
  
  const publicSubroutes = pipe(
    roleRoutes.left,
    arrMap((a) => ({ path: a[0], element: a[1] } as RouteObject)),
  );
  
  const protectedSubroutes = pipe(
    roleRoutes.right,
    arrMap((a) => ({
      path: a[0],
      element: <ProtectedRoute allowedRoles={[a[0]]} />,
      children: Array.of({ index: true, element: a[1] }),
    }) as RouteObject),
  );


  // const children = concat(publicSubroute)(protectedSubroute);
  const children = pipe(
    Aof({ index: true, element: <ProtectedRouteHandler roles={availableRoles} />}),
    concat(publicSubroutes),
    concat(protectedSubroutes)
    )

  return {
    path: pathParts(route),
    children,
  };
};

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter(isPublicPageData),
    Rcollect(Ord)(mapToPublicRouteObject),
  );

const privateRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter(isPrivatePageData),
    Rcollect(Ord)(mapToPrivateRouteObject),
  );

const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter(isProtectedPageData),
    Rcollect(Ord)(mapToProtectedRouteObject),
  );

const buildMergedRoutes = ({
  publicR,
  privateR,
  protectedR,
}: {
  publicR: Array<RouteObject>;
  privateR: Array<RouteObject>;
  protectedR: Array<RouteObject>;
}) => pipe(publicR, concat(privateR), concat(protectedR));

const createRouteDefinition = (allRoutes: dynamicRouteProperties) =>
  pipe(
    Do,
    Olet("publicR", () => pipe(allRoutes, publicRoutes)),
    Olet("privateR", () => pipe(allRoutes, privateRoutes)),
    Olet("protectedR", () => pipe(allRoutes, protectedRoutes)),
    Olet("mergedR", buildMergedRoutes),
    Olet("finalRoutes", ({ mergedR }) =>
      pipe({ element: <Layout />, children: mergedR }, Array.of),
    ),
    match(
      () => [],
      ({ finalRoutes }) => finalRoutes,
    ),
  );

const routeDefinitions = createRouteDefinition(dynamicRoutes);

const router = createBrowserRouter(routeDefinitions);

export { router };
