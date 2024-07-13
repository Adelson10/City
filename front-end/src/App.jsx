import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import { AuthProvider } from './shared/context/AuthProvider';

function App() {

  return (
    <>
      <AuthProvider>
          <Login>
              <Dashboard></Dashboard>
          </Login> 
      </AuthProvider>
    </>
  )
}

export default App
