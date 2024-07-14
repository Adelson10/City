import React from 'react';
import './Login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from '../../shared/components/FormLogin/FormLogin';
import FormCadastro from '../../shared/components/FormCadastro/FormCadastro';
import { useAuthContext } from '../../shared/context/AuthProvider';

const Login = ({children}) => {

    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <section>
            <article className='Box__Login'>
                <BrowserRouter>
                        <Routes>
                            <Route path='*' element={<FormLogin />}></Route>
                            <Route path='/cadastro' element={<FormCadastro />}></Route>
                        </Routes>
                </BrowserRouter>
            </article>
        </section>
    )
}

export default Login;