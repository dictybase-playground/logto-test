import { useEffect } from "react";
import { usePermify } from "@permify/react-role";
import { useLogto } from "@logto/react";
import "./App.css";

const useInitializePermify = () => {
  const { isAuthenticated, fetchUserInfo } = useLogto();
  const { setUser } = usePermify();
  console.log("useInitializePermify")
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return
      const userData = await fetchUserInfo();
      console.log(userData)
      if (!userData) return;
      console.log("setting user", userData.sub, userData.roles)
      setUser({
        id: userData.sub,
        roles: userData.roles,
      });
    };
    fetchUser();
  }, [fetchUserInfo, isAuthenticated, setUser]);
};

export { useInitializePermify };
