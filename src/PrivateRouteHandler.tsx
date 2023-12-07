import { Outlet } from "react-router-dom"
import { P, match } from "ts-pattern"
import { match as Omatch, none, some } from "fp-ts/Option"
import { type UserInfoResponse } from "@logto/react"
import { useLogtoUser } from "./useLogtoUser"
import { Loader } from "./Loader"
import { pipe } from "fp-ts/lib/function"

type UserContext = { user: NonNullable<UserInfoResponse> }

const PrivateRouteHandler = () => {
  const { isAuthenticated, user, isLoading } = useLogtoUser()
  return match({ user, isLoading, isAuthenticated })
    .with({ isAuthenticated: false }, () => <> Forbidden </>)
    .with({ isLoading: false, user: none }, () => <Loader />)
    .with({ isLoading: true }, () => <Loader />)
    .with(
      { isLoading: false, user: P.select(some({ sub: P.string })) },
      (_user) =>
        pipe(
          _user,
          Omatch(
            () => <> This message should not appear </>,
            (a) => <Outlet context={{ user: a }} />,
          ),
        ),
    )
    .exhaustive()
}

export { PrivateRouteHandler, type UserContext }
