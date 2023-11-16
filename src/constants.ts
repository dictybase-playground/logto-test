import { type ReactNode } from "react"

type Role = "curator" | "administrator" | "basic"

enum RolePriority {
  administrator,
  curator,
  basic
}

enum ACCESS {
  protected,
  private
}

type RouteMap = Array<[Role, ReactNode]>


export { type Role, type RolePriority, ACCESS, type RouteMap }