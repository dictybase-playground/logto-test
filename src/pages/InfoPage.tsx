import { BasicView } from "../views/BasicView";
import { CuratorView } from "../views/CuratorView";
import { AdminView } from "../views/AdminView";
import { RouteHandler } from "../RouteHandler"

const roleViews = {
   curator:  <CuratorView />,
   administrator:  <AdminView />,
   basic:  <BasicView />
}


export default <RouteHandler roleViews={roleViews} />