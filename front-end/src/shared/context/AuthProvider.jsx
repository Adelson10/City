import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useAuth from '../Hooks/useAuth';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider = ({children}) => {
  const [acessToken, setAcessToken] = useState('');

  const Auth = useAuth();

  useEffect(() => {
    const acessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if(acessToken) {
      setAcessToken(JSON.stringify(acessToken));
    } else {
      setAcessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback( async (form) => {
    const result = await Auth.post('/login', form);
      if(result instanceof Error) {
        throw new Error(result.message);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.acessToken));
        setAcessToken(result.acessToken);
      }
  }, []);

  const handleLayout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAcessToken(undefined);
  });

  const isAuthenticated = useMemo(() => !!acessToken, [acessToken]);

  return (
    <AuthContext.Provider value={ { isAuthenticated, login: handleLogin, layout: handleLayout } }>
        {children}
    </AuthContext.Provider> 
   )
}

export const useAuthContext = () => useContext(AuthContext);