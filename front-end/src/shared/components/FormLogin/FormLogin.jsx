import React from 'react'
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import { NavLink } from 'react-router-dom';
import './FormLogin.css';
import useValidation from '../../Hooks/useValidation';
import { useAuthContext } from '../../context/AuthProvider';
import { BsEnvelope,BsLock } from "react-icons/bs";

const FormLogin = () => {
  document.title = 'Login';
  const { login } = useAuthContext();

  const email = useValidation('email');
  const senha = useValidation();
  const [message, setMessage] = React.useState('');

  let form = {
    email: email.value,
    senha: senha.value
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(form);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(null), 4000);
    }
  }

  return (
    <>
          <div className='login_Title'>
              <h2>Bem-vindo!</h2>
              <p>Faça login para cadastrar suas cidades.</p>
          </div>
            <form onSubmit={handleSubmit}>
                <Input icon={<BsEnvelope />} type="email" id="email" name="email" {...email} >Email</Input>
                <Input icon={<BsLock />} type="password" id="senha" name="senha" {...senha}>Senha</Input>
                {message && <p className='Messagem-Error'>{message}</p>}
                <Button>Login</Button>
            </form>
          <p className='login_link'>Não e cadastrado? <NavLink to="/cadastro" >Cadastre-se</NavLink></p>
    </>
  )
}

export default FormLogin;