import { type ReactNode } from "react";

enum Role {
  ADMINISTRATOR = "administrator",
  CURATOR = "curator",
  BASIC = "basic",
}

enum ACCESS {
  public,
  protected,
  private,
}

const rolePriority = {
  [Role.ADMINISTRATOR]: 0,
  [Role.CURATOR]: 1,
  [Role.BASIC]: 2,
};

type RouteMap = Array<[Role, ReactNode]>;

export { Role, ACCESS, rolePriority, type RouteMap };
