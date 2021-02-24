import React, { useEffect, useState } from 'react';
import { getAndSetKey, hasKey } from '../common/auth';

const UserContext = React.createContext({});

export const useUserContext = () => React.useContext(UserContext);

const UserContextProvider = (props) => {
   const [isSignedIn, setIsSignedIn] = useState(false);

   const signIn = async (credentials) => {
      const result = await getAndSetKey(credentials);
      setIsSignedIn(result);
   };

   const signOut = () => {
      localStorage.removeItem('api-key');
      localStorage.removeItem('api-credentials');
      setIsSignedIn(false);
   };

   useEffect(() => {
      if (hasKey()) {
         setIsSignedIn(true);
      }
   }, []);

   return (
      <UserContext.Provider value={{ isSignedIn, signIn, signOut }}>
         {props.children}
      </UserContext.Provider>
   );
};

export default UserContextProvider;
