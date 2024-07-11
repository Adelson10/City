import React from 'react';
import './Login.css';
import Input from '../../forms/Input';
import IconUser from '../../../assets/Icon/user.svg';
import IconLock from '../../../assets/Icon/lock.svg';
import Button from '../../forms/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  const cor = 'Verde';
  return (
    <section>
        <article>
            <h2>Faça Login</h2>
            <p className='Login__SubTitle'>Seja bem-vindo! Faça login para cadastrar suas cidades.</p>
            <form>
                <Input Cor={cor} imagem={IconUser} type="email" id="email" name="email">Email</Input>
                <Input Cor={cor} imagem={IconLock} type="password" id="senha" name="senha" >Senha</Input>
                <Button Cor={cor}>Login</Button>
            </form>
            <p>Não e cadastrado? <Link></Link> <a href="*" target='self'><strong>Cadastre-se</strong></a></p>
        </article>
    </section>
  )
}

export default Login;