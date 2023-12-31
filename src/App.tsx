import { AuthProvider } from "./AuthProvider"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { MainApp } from "./MainApp"
import "./App.css"

const apolloClient = new ApolloClient({
  uri: "https://testapp.com/",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <MainApp />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
