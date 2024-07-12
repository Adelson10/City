import React from 'react';
import './Login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from '../FormLogin/FormLogin';
import FormCadastro from '../FormCadastro/FormCadastro';
import { useAuthContext } from '../../context/AuthProvider';

const Login = ({children}) => {

    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <section>
        <article>
            <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<FormLogin />}></Route>
                        <Route path='/cadastro' element={<FormCadastro />}></Route>
                    </Routes>
            </BrowserRouter>
        </article>
        </section>
    )
}

export default Login;