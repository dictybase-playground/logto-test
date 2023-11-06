import { match } from "ts-pattern"
import { type ReactNode } from "react"
import { useRoles } from "./useRoles"

type RouterHandlerProperties = {
  roleViews: { [role: string]: ReactNode}
}

const RouteHandler = ({ roleViews }: RouterHandlerProperties) => {
  const { isLoading, roles } = useRoles()

  return match({isLoading, roles})
          .with({isLoading: true}, () => <> Loading </>)
          .when(() => roles.includes("administrator") && roleViews.administrator, () => roleViews.administrator)
          .when(() => roles.includes("curator") && roleViews.curator, () => roleViews.curator)
          .when(() => roles.includes("basic") && roleViews.basic, () => roleViews.basic)
          .otherwise(() => <></>)
}

export { RouteHandler }