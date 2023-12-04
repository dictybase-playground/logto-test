import { pipe } from "fp-ts/function"
import { map, filter } from "fp-ts/Array"
import { TE } from "fp-ts/lib/TaskEither"
import { ReactNode } from "react"
import { RoleNames } from "./constants"
import { usePermify } from "@permify/react-role"
import { useNavigate } from "react-router-dom"

/**
 * 1. [Array<Role>, ReactNode]
 * 2. [isAuthorized(Array<Role>), ReactNode]
 * 3. [filtered(Array<Role>), ReactNode]
 * 4. navigate to highest priority allowed route
 */

type RoleComponent = [Array<RoleNames>, ReactNode]

type RoleComponentMap = Array<RoleComponent>

const authorizationPredicate =  (authorizationFunction: (roleNames: Array<RoleNames>) => Promise<boolean>) => 
  async (roleComponents: RoleComponent) =>  {
    const isAuthorized = await authorizationFunction(roleComponents[0])
    return isAuthorized
  }
  
const IndexRoute = ({ roleViews }: RoleComponentMap) => {
  const { isAuthorized } = usePermify()
  const navigate = useNavigate()
    
  const AuthorizedViews = (roleMap: RoleComponentMap) => 
    pipe(
      roleMap,
      filter(authorizationPredicate(isAuthorized))
    )
}

export { IndexRoute }