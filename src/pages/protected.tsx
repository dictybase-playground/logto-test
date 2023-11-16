import { ACCESS } from "../constants";

const ProtectedBasic = () => <> Hello Basic User! </>;

const ProtectedAdmin = () => {
  return <> Hello, Administrator. </>;
};

const access = ACCESS.protected;

const routeMap = [
  ["administrator", <ProtectedAdmin />],
  ["basic", <ProtectedBasic />],
];

export { ProtectedBasic, ProtectedAdmin, access, routeMap };
