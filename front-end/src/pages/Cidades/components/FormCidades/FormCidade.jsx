import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';
import useCidade from '../../../../shared/services/useCidades';
import './FormCidade.css';
import { BsBuilding } from "react-icons/bs";

const formFrield = [
    {
      id: 'nome',
      label: 'Nome',
      type: 'text',
      icon: <BsBuilding />
    }
]

const FormCidade = ({detalhe, id}) => {
    const [message, setMessage] = React.useState('');
    const cidades = useCidade();
    const navegation = useNavigate();
    const [lista, setLista] = React.useState();
    
    const formValidation = UseValidation('text');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (detalhe === 'adicionar') {
              const response = await cidades.create({nome: formValidation.value});
              if(typeof response === 'number') return navegation('/cidades');
            } else {
                const resposta = await cidades.UpdateById({nome: formValidation.value}, id);
                console.log(resposta);
                return navegation('/cidades');
            }
        } catch (error) {
            setMessage(error.message);
            setTimeout(() => setMessage(null),2000);
        }
    }

    React.useEffect(() => {
      const responseEdit = async () => {
        if (detalhe === 'editar') {
          const GetValues = await cidades.getById(id);
          formValidation.setValue(GetValues.nome);
        }
      }
      responseEdit();
    }, []);

  return (
    <form onSubmit={handleSubmit} className='Cidades__Form'>
        {formFrield.map(({id, label, type, icon}, index) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation} list={index === formFrield.length-1 ? lista : ''} maxLength={ index === 2 ? 8 : '' } >{label}</Input>;
        })}
        {message}
        <Button fontWeight='400' width='100%'>{detalhe === 'adicionar' ? 'Cadastrar' : 'Editar'}</Button>
    </form>
  )
}

export default FormCidade;