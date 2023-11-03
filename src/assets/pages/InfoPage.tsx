import { BasicView } from "../../views/BasicView";
import { CuratorView } from "../../views/CuratorView";
import { AdminView } from "../../views/AdminView";

const pageViews = [
  {role: "curator", component: <CuratorView />},
  {role: "administrator", component: <AdminView />},
  {role: "basic", component: <BasicView />}
]

export default pageViews