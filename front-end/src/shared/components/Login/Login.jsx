import React from 'react';
import './Login.css';
import Input from '../../forms/input';

const Login = () => {
  return (
    <section>
        <article>
            <h2>Identifique-se</h2>
            <form>
                <Input type="email" id="email" name="email">Email</Input>
                <Input type="password" id="senha" name="senha">Senha</Input>
                <button>Login</button>
            </form>
            <button>Cadastro</button>
        </article>
    </section>
  )
}

export default Login;