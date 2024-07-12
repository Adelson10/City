import React from 'react'
import Input from '../../forms/Input';
import UserIcon from '../Icons/UserIcon';
import LockIcon from '../Icons/LockIcon';
import Button from '../../forms/Button';
import { NavLink } from 'react-router-dom';
import './FormLogin.css';
import useValidation from '../../Hooks/useValidation';
import { useAuthContext } from '../../context/AuthProvider';

const FormLogin = ({cor}) => {

  const { isAuthenticated, login } = useAuthContext();

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
      const result = await login(form);
      console.log(result);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 2000);
    }
  }

  return (
    <>
            <h2>Faça Login</h2>
            <p className='Login__SubTitle'>Bem-vindo! Faça login para cadastrar suas cidades.</p>
            <form onSubmit={handleSubmit}>
                <Input icon={<UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon>} type="email" id="email" name="email" {...email} >Email</Input>
                <Input icon={<LockIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></LockIcon>} type="password" id="senha" name="senha" {...senha}>Senha</Input>
                {message && <p className='Messagem-Error'>{message}</p>}
                <Button Cor={cor}>Login</Button>
            </form>
        <p className='Link__Login'>Não e cadastrado? <NavLink className="Link" to="/cadastro" ><strong>Cadastre-se</strong></NavLink></p>
    </>
  )
}

export default FormLogin;