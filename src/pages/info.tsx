import { BasicView } from "../views/BasicView";
import { CuratorView } from "../views/CuratorView";
import { AdminView } from "../views/AdminView";
import { MultiViewRouteHandler } from "../MultiViewRouteHandler"

const roleViews = {
   curator:  <CuratorView />,
   administrator:  <AdminView />,
   basic:  <BasicView />,
   none: <> Welcome to dictyBase! If you have an account, please log in. </>
}

export default <MultiViewRouteHandler roleViews={roleViews} />