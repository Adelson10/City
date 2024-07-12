import Login from './shared/components/Login/Login';
import { AuthProvider } from './shared/context/AuthProvider';

function App() {

  return (
    <>
      <AuthProvider>
          <Login>
            
          </Login> 
      </AuthProvider>
    </>
  )
}

export default App
