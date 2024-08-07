import Login from './pages/Login/Login';
import { AuthProvider } from './shared/context/AuthProvider';
import AppRoutes from './routers/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import MenuLateral from './shared/components/MenuLateral/MenuLateral';
import { DarkModeProvider } from './shared/Hooks/useDarkMode';

function App() {
  return (
    <>
      <AuthProvider>
        <DarkModeProvider>
            <Login>
                  <div className='App'>
                  <BrowserRouter>
                      <MenuLateral>
                        <AppRoutes />
                      </MenuLateral>
                  </BrowserRouter>
                </div>
            </Login> 
        </DarkModeProvider>
      </AuthProvider>
    </>
  )
}

export default App
