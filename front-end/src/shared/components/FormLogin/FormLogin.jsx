import React from 'react'
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import { NavLink } from 'react-router-dom';
import './FormLogin.css';
import useValidation from '../../Hooks/useValidation';
import { useAuthContext } from '../../context/AuthProvider';

const FormLogin = () => {

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
            <h2>Faça Login</h2>
            <p className='Login__SubTitle'>Bem-vindo! Faça login para cadastrar suas cidades.</p>
            <form onSubmit={handleSubmit}>
                <Input icon={ { name: 'envelope', size: '1.2rem', class: { position: 'absolute', top: '0.5rem', left: '.7rem' } } } type="email" id="email" name="email" {...email} >Email</Input>
                <Input icon={ { name: 'lock-alt', size: '1.2rem', class: { position: 'absolute', top: '0.5rem', left: '.7rem' } } } type="password" id="senha" name="senha" {...senha}>Senha</Input>
                {message && <p className='Messagem-Error'>{message}</p>}
                <Button>Login</Button>
            </form>
        <p className='Link__Login'>Não e cadastrado? <NavLink className="Link" to="/cadastro" ><strong>Cadastre-se</strong></NavLink></p>
    </>
  )
}

export default FormLogin;