import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { router } from "./Routes";
import "./App.css";
import { useInitializePermify } from "./useInitializePermify";

const MainApp = () => {
  useInitializePermify();
  return <RouterProvider router={router} />;
};

export { MainApp };
