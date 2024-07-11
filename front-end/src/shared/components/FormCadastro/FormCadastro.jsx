import React from 'react'
import UserIcon from '../Icons/UserIcon';

const formFrield = [
  {
    id: 'nome',
    label: 'Digite seu Nome:',
    type: 'text',
    icon: <UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon>
  },
  {
    id: 'email',
    label: 'Digite seu Email:',
    type: 'email',
    icon: <UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon> 
  },
  {
    id: 'senha',
    label: 'Digite sua senha:',
    type: 'password',
    icon: <UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon>
  },
  {
    id: 'senha-re',
    label: 'Digite sua senha novamente:',
    type: 'password',
    icon: <UserIcon size='1.2rem' cor='rgb(122, 122, 122)' className='Icon'></UserIcon>
  },
]

const FormCadastro = () => {

  return (
    <>
        <h2>Cadastro</h2>
        <form>
            {formFrield.map( (item, index) => {
                return <Input key={index} Cor={cor} imagem={item.icon} type="email" id="email" name="email" {...email} >Email</Input> 
            })}
        </form>
    </>
  )
}

export default FormCadastro