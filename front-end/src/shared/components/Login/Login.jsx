import React from 'react';
import './Login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from '../FormLogin/FormLogin';
import FormCadastro from '../FormCadastro/FormCadastro';

const Login = () => {
  const cor = 'Verde';

  return (
    <section>
            <BrowserRouter>
                  <Routes>
                      <Route path='/' element={<FormLogin cor={cor}/>}></Route>
                      <Route path='/cadastro' element={<FormCadastro />}></Route>
                  </Routes>
            </BrowserRouter>
    </section>
  )
}

export default Login;