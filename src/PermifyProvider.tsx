import { type ReactNode, useEffect } from 'react';
import { useLogto } from '@logto/react';
import { PermifyProvider as Provider, usePermify } from "@permify/react-role"
import './App.css'


type PermifyProviderProperties = {
  children: ReactNode
}

const PermifyProvider = ({ children }: PermifyProviderProperties) => {
  const { isAuthenticated, fetchUserInfo, isLoading } = useLogto()
  const { setUser } = usePermify()
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || isLoading) return
      const userData = await fetchUserInfo()
      if(!userData) return
      setUser({ 
        id: userData.sub,
        roles: userData.roles
      })
    }
    fetchUser()
  }, [fetchUserInfo, isAuthenticated, isLoading, setUser])
  


  return (
      <Provider>
        {children}
      </Provider>
  )
}

export { PermifyProvider  }
