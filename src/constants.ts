type Role = "curator" | "administrator" | "basic"

enum RolePriority {
  administrator,
  curator,
  basic
}

export { type Role, type RolePriority }