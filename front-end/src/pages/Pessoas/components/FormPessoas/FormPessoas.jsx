import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';

const FormPessoas = ({id}) => {

    const [buttons, setButtons] = React.useState({
        add: false,
        back: false
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

    const formValidation = UseValidation();

  return (
    <form onSubmit={handleSubmit}>
        <div className='Container__Adicionar'>
            <Button onClick={() => setButtons( (botao) => ({ ...botao, add:true }) ) } fontWeight='bold' width={10}>{id === 'adicionar' ? 'CADASTRAR' : 'EDITAR'}</Button>
            <Button onClick={() => setButtons( (botao) => ({ ...botao, back:true }) ) } fontWeight='bold' width={10}>{'CANCELAR'}</Button>
        </div>

    </form>
  )
}

export default FormPessoas;