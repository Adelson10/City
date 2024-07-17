import React, { useMemo } from 'react'
import Input from '../../forms/Input';
import Button from '../../forms/Button';
import UseValidation from '../../Hooks/useValidation';
import { NavLink, useNavigate } from 'react-router-dom';

const FormCadastro = () => {

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
    <>
        <h2>Cadastre-se</h2>
        <p className='Login__SubTitle'>Cadastre sua cidade e contribua para uma rede de informações locais.</p>
        <form onSubmit={handleSubmit}>
            {formFrield.map( ({id, label, type, icon },index) => {
                return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} >{label}</Input> 
            })}
            {message}
            <Button>Cadastre-se</Button>
        </form>
        <p className='Link__Login'>Já e cadastrado? <NavLink className="Link" to="/" ><strong>Faça Login</strong></NavLink></p>
    </>
  )
}

export default FormCadastro