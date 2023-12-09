import { graphql, HttpResponse } from "msw"

const handlers = [
  graphql.query("GetProtectedResource", ({ variables }) => {
    const { access_token } = variables

    if (!access_token)
      return HttpResponse.json(
        { errors: [{ message: "unauthorized" }] },
        { status: 401 },
      )

    return HttpResponse.json({
      data: {
        resource: "This is the protected resource",
      },
    })
  }),

  graphql.query("GetAccessToken", () => {}),
  graphql.query("GetUser", () => {}),
]

export { handlers }
