import React from 'react'
import { useParams } from 'react-router-dom';
import FormCidades from './components/FormCidades/FormCidade';

const CidadeDados = () => {
  const { id , detalhe } = useParams();
  return (
    <>
        <div className='Dashboard'>
          <h1>{detalhe === 'adicionar' ? 'Adicionar Pessoa' : 'Editar Pessoa'}</h1>
          <FormCidades id={id} detalhe={detalhe}></FormCidades>
        </div>
    </>
  )
}

export default CidadeDados;