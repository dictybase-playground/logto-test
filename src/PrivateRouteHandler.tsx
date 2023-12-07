import { Outlet } from "react-router-dom"
import { P, match } from "ts-pattern"
import { none, some } from "fp-ts/Option"
import { useLogtoUser } from "./useLogtoUser"
import { Loader } from "./Loader"

const PrivateRouteHandler = () => {
  const { user } = useLogtoUser()
  const isLoading = false
  return (
    // hmm maybe this logic could be written a better way
    match({ user, isLoading })
      .with({ isLoading: true }, () => <Loader />)
      .with({ user: none }, () => <> No user found </>)
      .with({ user: some({ sub: P.string }) }, () => <Outlet />)
      .otherwise(() => <> This message should not appear. </>)
  )
}

export { PrivateRouteHandler }
