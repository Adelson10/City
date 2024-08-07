import { useState } from 'react';
import './Login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from '../../shared/components/FormLogin/FormLogin';
import FormCadastro from '../../shared/components/FormCadastro/FormCadastro';
import { useAuthContext } from '../../shared/context/AuthProvider';
import WidthScreen from '../../shared/context/WidthScreen';
import { useDarkContext } from '../../shared/Hooks/useDarkMode';
import { BsFillMoonFill,BsFillSunFill } from "react-icons/bs";

const Login = ({children}) => {
    const { isAuthenticated } = useAuthContext();
    const { isMobile } = WidthScreen();
    const { toggleTheme } = useDarkContext();

    const [check,SetCheck] = useState(localStorage.getItem('APP_DARK_MODE'));
    
    function handleClick() {
        toggleTheme();
        SetCheck(document.querySelector('body').getAttribute('data-theme'));
    }

    if (isAuthenticated) {
        return (<>{children}</>)
    }

    return (
        <BrowserRouter>
              <div className='Container_Login'>
                <button onClick={handleClick} className='Botao_Icon Botao_Login'>{check==='light' ? <BsFillSunFill /> : <BsFillMoonFill />}</button>
                <Routes>
                    <Route path='*' element={<FormLogin isMobile={isMobile}/>}></Route>
                    <Route path='/cadastro' element={<FormCadastro isMobile={isMobile}/>}></Route>
                </Routes>
              </div>
        </BrowserRouter>
    )
}

export default Login;