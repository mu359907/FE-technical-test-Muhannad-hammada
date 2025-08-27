import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const WithAuth = <P extends {}>(WrappedComponent: any) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // console.log('isAuthenticated: ', isAuthenticated);
    useEffect(() => {
      const getStoreData = async () => {
        try {
        const session = await getSession();
        if(!session){
            router.push("/login");
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error fetching authentication data:", error);
        }
      };
      getStoreData();
    }, [router]);
    // Render the wrapped component if authenticated, otherwise return null
    return isAuthenticated ? <WrappedComponent {...(props as P)} /> : null;
  };
  return AuthComponent;
};
export default WithAuth;