import { PrivateRouteHandler } from "../PrivateRouteHandler";
import { P, match } from "ts-pattern";
import { useLogto } from "@logto/react";
import { AdminConsole } from "../views/AdminConsole";
import { useLazyQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_PROTECTED_RESOURCE = gql`
  query getProtectedResource($access_token: String!) {
    resource(access_token: $access_token) {
      id
    }
  }
`;

const AdminConsolePage = () => {
  const { getAccessToken } = useLogto();
  const [getProtectedResource, response] = useLazyQuery(GET_PROTECTED_RESOURCE);

  useEffect(() => {
    const fetchData = async () => {
      await getAccessToken();
      console.log("fetching protected resource");
      getProtectedResource({ variables: { access_token: getAccessToken() } });
    };
    fetchData();
  }, [getAccessToken, getProtectedResource]);

  return match(response)
    .with({ loading: true }, () => <> Loading </>)
    .with({ error: P.not(undefined) }, () => <> Error </>)
    .with({ data: { id: P.string } }, ({ data: { id } }) => (
      <AdminConsole id={id} />
    ))
    .otherwise(() => <> error </>);
};

export default (
  <PrivateRouteHandler
    allowedRoles={["administrator"]}
    page={<AdminConsolePage />}
  />
);
