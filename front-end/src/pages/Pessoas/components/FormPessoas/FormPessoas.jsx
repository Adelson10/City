import React from 'react';
import Button from '../../../../shared/forms/Button';
import { json, useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';
import './FormPessoa.css';
import useCidade from '../../../../shared/services/useCidades';
import { useDarkContext } from '../../../../shared/Hooks/useDarkMode';
import usePessoas from '../../../../shared/services/usePessoas';

const formFrield = [
    {
      id: 'nomeCompleto',
      label: 'Nome',
      type: 'text',
      icon: { 
        name: 'user',
        size: '1.2rem',
        class: {
          position: 'absolute',
          top: '0.5rem',
          left: '.7rem'},
      },
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      icon: { 
        name: 'envelope', 
        size: '1.2rem',  
        class: {
          position: 'absolute',
          top: '0.5rem',
          left: '.7rem'},
    },
  },
  {
      id: 'cep',
      label: 'Cep',
      type: 'text',
      icon: {
        name: 'current-location', 
        size: '1.2rem',
        class: {
          position: 'absolute',
          top: '0.5rem',
          left: '.7rem'},
    },
  },
  {
    id: 'city',
    label: 'Cidade',
    type: 'text',
    icon: {
      name: 'location-plus', 
      size: '1.2rem',
      class: {
        position: 'absolute',
        top: '0.5rem',
        left: '.7rem'},
  }
},
]

const FormPessoas = ({id}) => {
    const [message, setMessage] = React.useState('');
    const { getAll } = useCidade();
    const navegation = useNavigate();
    const [lista, setLista] = React.useState();
    const { style } = useDarkContext();
    const { create } = usePessoas();

    const formValidation = [
        UseValidation('text'),
        UseValidation('email'),
        UseValidation('cep'),
        UseValidation('text'),
      ];

    const form = React.useMemo( () => {
        let formMod = {}
        formMod['nomeCompleto'] = formValidation[0].value;
        formMod['email'] = formValidation[1].value;
        formMod['cep'] = formValidation[2].value;
        formMod['cidadeId'] = formValidation[3].value;
        return formMod;
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await create(form);
            console.log(response);
            if(typeof response === 'number') return navegation('/pessoas');
        } catch (error) {
            setMessage(error.message);
            setTimeout(() => setMessage(null),2000);
        }
    }

    React.useEffect( () => {
      const response = async () => {
        const result = await getAll(formValidation[3].value,1,0);
        setLista(result.json);
      };
      response();
    }, [formValidation[3].value]);

  return (
    <form onSubmit={handleSubmit} className='Pessoas__Form'>
        <div className='Container__Adicionar'>
            <Button fontWeight='bold' width={10}>{id === 'adicionar' ? 'CADASTRAR' : 'EDITAR'}</Button>
            <Button onClick={() => navegation('/pessoas') } fontWeight='bold' width={10}>{'CANCELAR'}</Button>
        </div>
        {formFrield.map(({id, label, type, icon}, index) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} cor={style.color} list={index === formFrield.length-1 ? lista : ''} maxLength={ index === 2 ? 8 : '' } >{label}</Input>;
        })}
        {message}
    </form>
  )
}

export default FormPessoas;