import React from 'react'
import Input from '../../forms/Input';
import IconUser from '../../../assets/Icon/user.svg';
import IconLock from '../../../assets/Icon/lock.svg';
import Button from '../../forms/Button';
import { NavLink } from 'react-router-dom';
import './FormLogin.css';

const FormLogin = ({cor}) => {
  const [form, setForm] = React.useState({
    email: '',
    senha: ''
  }); 

  function handleChange(event) {
    const { id , value } = event.target;
    setForm({...form, [id]: value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const response = await fetch('https://estudos-nodejs-2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      
    }
  }

  return (
    <article>
        <h2>Faça Login</h2>
            <p className='Login__SubTitle'>Seja bem-vindo! Faça login para cadastrar suas cidades.</p>
            <form onSubmit={handleSubmit}>
                <Input Cor={cor} imagem={IconUser} type="email" id="email" name="email" setChange={handleChange} value={form['email']} >Email</Input>
                <Input Cor={cor} imagem={IconLock} type="password" id="senha" name="senha" setChange={handleChange} value={form['senha']}>Senha</Input>
                <Button Cor={cor}>Login</Button>
            </form>
        <p>Não e cadastrado? <NavLink to="/cadastro" ><strong>Cadastre-se</strong></NavLink></p>
    </article>
  )
}

export default FormLogin;