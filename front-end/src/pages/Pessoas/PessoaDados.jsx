import React from 'react'
import { useParams } from 'react-router-dom';
import './PessoasDados.css';
import FormPessoas from './components/FormPessoas/FormPessoas';

const PessoaDados = () => {
  const { id , detalhe } = useParams();
  document.title = detalhe;
  return (
    <>
        <div className='Dashboard'>
          <h1>{detalhe === 'adicionar' ? 'Adicionar Pessoa' : 'Editar Pessoa'}</h1>
          <FormPessoas id={id} detalhe={detalhe}></FormPessoas>
        </div>
    </>
  )
}

export default PessoaDados;