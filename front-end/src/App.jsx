import Login from './pages/Login/Login';
import { AuthProvider } from './shared/context/AuthProvider';
import AppRoutes from './routers/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import MenuLateral from './shared/components/MenuLateral/MenuLateral';
import useDarkMode from './shared/Hooks/useDarkMode';

function App() {
  const {DarkMode} = useDarkMode();
  return (
    <>
      <AuthProvider>
          <Login>
            <DarkMode>
                <div className='App'>
                <BrowserRouter>
                    <MenuLateral>
                    <AppRoutes />
                    </MenuLateral>
                </BrowserRouter>
              </div>
            </DarkMode>
          </Login> 
      </AuthProvider>
    </>
  )
}

export default App
