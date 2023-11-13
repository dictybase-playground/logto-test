import { BasicView } from "../views/BasicView";
import { CuratorView } from "../views/CuratorView";
import { AdminView } from "../views/AdminView";

const roleViews = {
  curator: <BasicView />,
  administrator: <AdminView />,
  basic: <BasicView />,
  none: <> Welcome to dictyBase! If you have an account, please log in. </>,
};

export { roleViews };

// /info
