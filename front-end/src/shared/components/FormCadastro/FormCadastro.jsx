import React, { useEffect } from 'react'
import UserIcon from '../Icons/UserIcon';
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import UseValidation from '../../Hooks/useValidation';
import LockIcon from '../Icons/LockIcon';
import EmailIcon from '../Icons/EmailIcon';
import { json, NavLink, useNavigate } from 'react-router-dom';


const formFrield = [
  {
    id: 'nome',
    label: 'Nome',
    type: 'text',
    icon: <UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon>,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    icon: <EmailIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></EmailIcon>,
  },
  {
    id: 'senha',
    label: 'Senha',
    type: 'password',
    icon: <LockIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></LockIcon>,
  }
]

const FormCadastro = () => {

    const formValidation = [
      UseValidation('text'),
      UseValidation('email'),
      UseValidation('password')
    ];

    const [form, setForm] = React.useState( () => formValidation.forEach( (form) => setForm( () => form.value) ) );
    console.log(form);
    const navegation = useNavigate();

    const [message, setMessage] = React.useState('');

    async function handleSubmit(event) {
      event.preventDefault();
      console.log(form);
      try {
        const response = await fetch('https://estudos-nodejs-2.onrender.com/cadastro', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          //body: JSON.stringify(form)
        });
        const json = await response.json();
        if (response.ok!==true) {
          setMessage(json.errors.default);
          setTimeout(() => setMessage(null), 2000);
          throw new Error(response.message);
        } else {
          navegation('/');
        }
      } catch (error) {
          setTimeout(() => setMessage(null), 4000);
          throw new Error(response.message);
      }
    }
    
  return (
    <>
        <h2>Cadastre-se</h2>
        <p className='Login__SubTitle'>Cadastre sua cidade e contribua para uma rede de informações locais.</p>
        <form onSubmit={handleSubmit}>
            {formFrield.map( ({id, label, type, icon },index) => {
                return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} >{label}</Input> 
            })}
            {message}
            <Button Cor={'Verde'}>Cadastre-se</Button>
        </form>
        <p className='Link__Login'>Já e cadastrado? <NavLink className="Link" to="/" ><strong>Faça Login</strong></NavLink></p>
    </>
  )
}

export default FormCadastro