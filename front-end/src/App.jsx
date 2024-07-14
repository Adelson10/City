import Login from './pages/Login/Login';
import { AuthProvider } from './shared/context/AuthProvider';
import AppRoutes from './routers/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import MenuLateral from './shared/components/MenuLateral/MenuLateral';

function App() {

  return (
    <>
      <AuthProvider>
          <Login>
            <div className='App'>
              <BrowserRouter>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </BrowserRouter>
            </div>
          </Login> 
      </AuthProvider>
    </>
  )
}

export default App
