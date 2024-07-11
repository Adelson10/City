import React from 'react'
import Input from '../../forms/Input';
import IconUser from '../../../assets/Icon/user.svg';
import IconLock from '../../../assets/Icon/lock.svg';
import Button from '../../forms/Button';
import { NavLink } from 'react-router-dom';
import './FormLogin.css';
import useValidation from '../../Hooks/useValidation';

const FormLogin = ({cor}) => {
  const email = useValidation('email');
  const senha = useValidation();
  const [message, setMessage] = React.useState('');

  let form = {
    email: email.value,
    senha: senha.value
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    try {
      const response = await fetch('https://estudos-nodejs-2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });
      const json = await response.json();
      if (response.ok!==true) {
        setTimeout(() => setMessage(null), 4000);
        setMessage(json.errors.default);
        throw new Error(response.message);
      }
      else console.log(json);
    } catch (error) {
      setTimeout(() => setMessage(null), 4000);
      throw new Error(response.message);
    }
  }

  return (
    <>
        <h2>Faça Login</h2>
            <p className='Login__SubTitle'>Seja bem-vindo! Faça login para cadastrar suas cidades.</p>
            <form onSubmit={handleSubmit}>
                <Input Cor={cor} imagem={IconUser} type="email" id="email" name="email" {...email} >Email</Input>
                <Input Cor={cor} imagem={IconLock} type="password" id="senha" name="senha" {...senha}>Senha</Input>
                {message}
                <Button Cor={cor}>Login</Button>
            </form>
        <p>Não e cadastrado? <NavLink className="Link" to="/cadastro" ><strong>Cadastre-se</strong></NavLink></p>
    </>
  )
}

export default FormLogin;