import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { router } from "./Routes";
import "./App.css";
import { PermifyInitializer } from "./PermifyInitializer";

const apolloClient = new ApolloClient({
  uri: "https://testapp.com/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <PermifyInitializer />
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
