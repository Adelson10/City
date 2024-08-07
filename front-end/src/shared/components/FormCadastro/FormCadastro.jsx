import React, { useMemo } from 'react'
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import UseValidation from '../../Hooks/useValidation';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsEnvelope,BsLock,BsPerson } from "react-icons/bs";
import { DownMotion } from '../../Animations/DownMotion';

const formFrield = [
  {
    id: 'nome',
    label: 'Nome',
    type: 'text',
    icon: <BsPerson />
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    icon: <BsEnvelope />
},
{
    id: 'senha',
    label: 'Senha',
    type: 'password',
    icon: <BsLock />
}
]

const FormCadastro = ({isMobile}) => {
    document.title = 'Cadastrar';
    const formValidation = [
      UseValidation('text'),
      UseValidation('email'),
      UseValidation('password')
    ];
        
    const navegation = useNavigate();

    const [message, setMessage] = React.useState('');

    const form = useMemo(() => {
        let formMod = {}
        formValidation.forEach(({value},index) => {
            const id = formFrield[index].id;
            return formMod[id] = value;
        })
        return formMod;
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
          const response = await fetch('https://estudos-nodejs-2.onrender.com/cadastro', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(form)
          });
          const json = await response.json();
          if (response.ok!==true) {
            setMessage(() => { if(json.errors.default === 'Erro ao cadastro o usuario') return 'Usuario já cadastrado.'; else json.errors.default;});
            setTimeout(() => setMessage(null), 4000);
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
    <DownMotion width='fit-content' Animated={ isMobile ? false : true}>
    <div className='Login_box'>
      <div className="login_Image"></div>
          <DownMotion width='100%' Animated={ isMobile ? true : false}>
              <div className="Form">
              <div className='login_Title'>
                <h2>Cadastre-se</h2>
                <p>Cadastre sua cidade e contribua para uma rede de informações locais.</p>
              </div>
              <form onSubmit={handleSubmit}>
                  {formFrield.map( ({id, label, type, icon },index) => {
                      return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} >{label}</Input> 
                  })}
                  {message}
                  <Button>Cadastre-se</Button>
              </form>
              <p className='login_link'>Já e cadastrado? <NavLink className="Link" to="/" >Faça Login</NavLink></p>
              </div>
          </DownMotion>
      </div>
    </DownMotion>
  )
}

export default FormCadastro