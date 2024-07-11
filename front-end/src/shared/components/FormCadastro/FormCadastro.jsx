import React from 'react'
import UserIcon from '../Icons/UserIcon';
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import UseValidation from '../../Hooks/useValidation';
import LockIcon from '../Icons/LockIcon';
import EmailIcon from '../Icons/EmailIcon';

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

    const form = [
        UseValidation('text'),
        UseValidation('email'),
        UseValidation('password')
    ];
    
  return (
    <>
        <h2>Cadastro</h2>
        <form>
            {formFrield.map( ({id, label, type, icon },index) => {
                return <Input key={id} icon={icon} type={type} id={id} name={id} {...form[index]} >{label}</Input> 
            })}
        </form>
        <Button Cor={'Verde'}>Login</Button>
    </>
  )
}

export default FormCadastro