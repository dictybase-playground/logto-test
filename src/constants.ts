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

export { type Role, RolePriority, ACCESS }