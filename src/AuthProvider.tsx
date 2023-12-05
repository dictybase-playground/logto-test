import { type ReactNode, type FunctionComponent } from 'react';
import { LogtoProvider, LogtoConfig } from '@logto/react';
import { PermifyProvider as P} from "@permify/react-role"
import './App.css'

type AuthProviderProperties = {
  children: ReactNode
}

const PermifyProvider = P as FunctionComponent<AuthProviderProperties>

const config: LogtoConfig = {
  endpoint: 'https://y8xykk.logto.app/',
  appId: '50a593m1g3bttpx1n7ll9',
  resources: ["localhost:3000"],
  scopes: ["openid", "profile", "email", "phone", "roles", "write:content"],
}

const AuthProvider = ({ children }: AuthProviderProperties) => {
  return (
    <LogtoProvider config={config}>
      <PermifyProvider>
        {children}
      </PermifyProvider>
    </LogtoProvider>
  )
}

export { AuthProvider }
