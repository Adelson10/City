import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';
import './FormPessoa.css';

const formFrield = [
    {
      id: 'nome',
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
      list: ''
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
    list: ''
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
    list: ''
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
  },
  list: 'ListaCidades'
},
  ]
const FormPessoas = ({id}) => {

    const formValidation = [
        UseValidation('text'),
        UseValidation('email'),
        UseValidation('cep'),
        UseValidation('text'),
      ];

    const [message, setMessage] = React.useState('');

    const form = React.useMemo(() => {
        let formMod = {}
        formValidation.forEach(({value},index) => {
            const id = formFrield[index].id;
            return formMod[id] = value;
        })
        return formMod;
    });

    const navegation = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit} className='Pessoas__Form'>
        <div className='Container__Adicionar'>
            <Button onClick={() => setButtons( (botao) => ({ ...botao, add:true }) ) } fontWeight='bold' width={10}>{id === 'adicionar' ? 'CADASTRAR' : 'EDITAR'}</Button>
            <Button onClick={() => navegation('/pessoas') } fontWeight='bold' width={10}>{'CANCELAR'}</Button>
        </div>
        {formFrield.map(({id, label, type, icon, list}, index) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} list={list}>{label}</Input>;
        })}
        {message}
    </form>
  )
}

export default FormPessoas;