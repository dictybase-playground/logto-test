import { Outlet } from "react-router-dom"
import { P, match } from "ts-pattern"
import { none, some } from "fp-ts/Option"
import { type UserInfoResponse } from "@logto/react"
import { useLogtoUser } from "./useLogtoUser"
import { Loader } from "./Loader"

type UserContext = { user: NonNullable<UserInfoResponse> }

const PrivateRouteHandler = () => {
  const { user, isLoading } = useLogtoUser()
  return match({ user, isLoading })
    .with({ isLoading: true }, () => <Loader />)
    .with({ user: none }, () => <> No user found </>)
    .with({ user: P.select(some({ sub: P.string })) }, (_user) => (
      <Outlet context={{ _user }} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { PrivateRouteHandler, type UserContext }
