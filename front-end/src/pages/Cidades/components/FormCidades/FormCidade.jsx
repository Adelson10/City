import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';
import './FormPessoa.css';
import useCidade from '../../../../shared/services/useCidades';
import { useDarkContext } from '../../../../shared/Hooks/useDarkMode';
import usePessoas from '../../../../shared/services/usePessoas';

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
]

const FormPessoas = ({detalhe, id}) => {
    const [message, setMessage] = React.useState('');
    const cidades = useCidade();
    const navegation = useNavigate();
    const [lista, setLista] = React.useState();
    const { style } = useDarkContext();

    const formValidation = [
        UseValidation('text'),
    ];

    const form = React.useMemo( () => {
        let formMod = {}
        formMod['nome'] = formValidation[0].value;
        return formMod;
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (detalhe === 'adicionar') {
              const response = await cidades.create(form);
              if(typeof response === 'number') return navegation('/pessoas');
            } else {
                const responseEdit = await cidades.UpdateById(form, id);
                console.log(responseEdit);
                return navegation('/pessoas');
            }
        } catch (error) {
            setMessage(error.message);
            setTimeout(() => setMessage(null),2000);
        }
    }

    React.useEffect(() => {
      const responseEdit = async () => {
        if (detalhe === 'editar') {
          const GetValues = await pessoas.getById(id);
          formValidation[0].setValue(GetValues.nome);
        }
      }
      responseEdit();
    }, []);

  return (
    <form onSubmit={handleSubmit} className='Cidades__Form'>
        <div className='Container__Adicionar'>
            <Button fontWeight='bold' width={10}>{detalhe === 'adicionar' ? 'CADASTRAR' : 'EDITAR'}</Button>
            <Button onClick={() => navegation('/cidades') } fontWeight='bold' width={10}>{'CANCELAR'}</Button>
        </div>
        {formFrield.map(({id, label, type, icon}, index) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} cor={style.color} list={index === formFrield.length-1 ? lista : ''} maxLength={ index === 2 ? 8 : '' } >{label}</Input>;
        })}
        {message}
    </form>
  )
}

export default FormPessoas;