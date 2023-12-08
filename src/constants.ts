import { type ReactNode } from "react"

enum RoleNames {
  ADMINISTRATOR = "administrator",
  CURATOR = "curator",
  BASIC = "basic",
}
type Role = RoleNames.ADMINISTRATOR | RoleNames.CURATOR | RoleNames.BASIC

enum ACCESS {
  public,
  protected,
  private,
}

type RouteMap = Array<[RoleNames, ReactNode]>

type RoleAuthorization = Readonly<{ role: Role; authorization: boolean }>

const rolePriority = {
  [RoleNames.ADMINISTRATOR]: 0,
  [RoleNames.CURATOR]: 1,
  [RoleNames.BASIC]: 2,
}

export {
  RoleNames,
  ACCESS,
  rolePriority,
  type RouteMap,
  type Role,
  type RoleAuthorization,
}
