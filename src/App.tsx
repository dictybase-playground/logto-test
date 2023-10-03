import { LogtoProvider, LogtoConfig } from '@logto/react';
import { RouterProvider } from "react-router-dom"
import { router } from "./Routes"
import './App.css'

const config: LogtoConfig = {
  endpoint: 'https://y8xykk.logto.app/',
  appId: '50a593m1g3bttpx1n7ll9',
}

function App() {
  return (
    <LogtoProvider config={config}>
      <RouterProvider router={router} />
    </LogtoProvider>
  )
}

export default App
