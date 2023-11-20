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

type RouteMap = Array<[Role, ReactNode]>;

export { Role, ACCESS, type RouteMap };
