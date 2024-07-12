import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useAuth from '../Hooks/useAuth';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState('');

  const Auth = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if(accessToken) {
      setAccessToken(JSON.stringify(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback( async (form) => {
    const result = await Auth.post('/login', form);
      if(result instanceof Error) {
        throw new Error(result.message);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
        setAccessToken(result.accessToken);
      }
  }, []);

  const handleLayout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  });

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={ { isAuthenticated, login: handleLogin, layout: handleLayout } }>
        {children}
    </AuthContext.Provider> 
   )
}

export const useAuthContext = () => useContext(AuthContext);