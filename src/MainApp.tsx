import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";
import { useInitializePermify } from "./useInitializePermify";

const MainApp = () => {
  useInitializePermify();
  console.log("main")
  return <RouterProvider router={router} />;
};

export { MainApp };
