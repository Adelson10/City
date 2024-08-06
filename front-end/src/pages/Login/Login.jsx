import React from 'react';
import './Login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from '../../shared/components/FormLogin/FormLogin';
import FormCadastro from '../../shared/components/FormCadastro/FormCadastro';
import { useAuthContext } from '../../shared/context/AuthProvider';
import { DownMotion } from '../../shared/Animations/DownMotion';


const Login = ({children}) => {
    const { isAuthenticated } = useAuthContext();
    
    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <section className='container_login'>
            <div className="login_bg"></div>
            <div className='container_box'>
                <DownMotion>
                    <div className='login_box'>
                        <BrowserRouter>
                                <Routes>
                                    <Route path='*' element={<FormLogin />}></Route>
                                    <Route path='/cadastro' element={<FormCadastro />}></Route>
                                </Routes>
                        </BrowserRouter>
                    </div>
                </DownMotion>
            </div>
        </section>
    )
}

export default Login;