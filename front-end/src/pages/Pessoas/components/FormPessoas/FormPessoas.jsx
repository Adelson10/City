import React from 'react';
import Button from '../../../../shared/forms/Button';
import { useNavigate } from 'react-router-dom';
import UseValidation from '../../../../shared/Hooks/useValidation';
import Input from '../../../../shared/forms/Input';
import './FormPessoa.css';
import useCidade from '../../../../shared/services/useCidades';
import usePessoas from '../../../../shared/services/usePessoas';
import { BsPerson,BsEnvelope,Bs123,BsBuilding } from "react-icons/bs";

const formFrield = [
    {
      id: 'nomeCompleto',
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
      id: 'cep',
      label: 'Cep',
      type: 'text',
      icon: <Bs123 />
  },
  {
    id: 'city',
    label: 'Cidade',
    type: 'text',
    icon: <BsBuilding />
},
]

const FormPessoas = ({detalhe, id}) => {
    const [message, setMessage] = React.useState('');
    const cidades = useCidade();
    const navegation = useNavigate();
    const [lista, setLista] = React.useState();
    const pessoas = usePessoas();

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
            if (detalhe === 'adicionar') {
              const response = await pessoas.create(form);
              if(typeof response === 'number') return navegation('/pessoas');
            } else {
                const responseEdit = await pessoas.UpdateById(form, id);
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
          formValidation[0].setValue(GetValues.nomeCompleto);
          formValidation[1].setValue(GetValues.email);
          formValidation[2].setValue(GetValues.cep);
          const cidade = await cidades.getById(GetValues.cidadeId);
          formValidation[3].setValue(cidade.nome);
        }
      }
      responseEdit();
    }, []);

    React.useEffect( () => {
      const response = async () => {
        const result = await cidades.getAll(formValidation[3].value,1,0);
        setLista(result.json);
      };
      response();
    }, [formValidation[3].value]);

  return (
      <form onSubmit={handleSubmit} className='Pessoas__Form' autoComplete='off'>
        {formFrield.map(({id, label, type, icon}, index) => {
            return <Input key={id} icon={icon} type={type} id={id} name={id} {...formValidation[index]} list={index === formFrield.length-1 ? lista : ''} maxLength={ index === 2 ? 8 : '' } >{label}</Input>;
        })}
        {message}
        <Button fontWeight='400' width='100%' >{detalhe === 'adicionar' ? 'Cadastrar' : 'Editar'}</Button>
      </form>
  )
}

export default FormPessoas;