import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';

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
      id: 'select',
      label: 'select',
      type: 'password',
      icon: {
        name: 'lock-alt', 
        size: '1.2rem',
        class: {
          position: 'absolute',
          top: '0.5rem',
          left: '.7rem'},
    },
  },
  ]
const FormPessoas = ({id}) => {

    const [buttons, setButtons] = React.useState({
        add: false,
        back: false
    });

    const formValidation = [
        UseValidation('text'),
        UseValidation('email'),
        UseValidation('text')
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
        if (buttons.add) {
            /// evento de adicionar baseado no id
            
        } else if(buttons.back) {
            navegation('/pessoas');
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='Container__Adicionar'>
            <Button onClick={() => setButtons( (botao) => ({ ...botao, add:true }) ) } fontWeight='bold' width={10}>{id === 'adicionar' ? 'CADASTRAR' : 'EDITAR'}</Button>
            <Button onClick={() => setButtons( (botao) => ({ ...botao, back:true }) ) } fontWeight='bold' width={10}>{'CANCELAR'}</Button>
        </div>
        {formFrield.map(({id, label, type, icon}) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]}>{label}</Input>;
        })}
        <select name="city" id="city">
            
        </select>
        {message}
    </form>
  )
}

export default FormPessoas;