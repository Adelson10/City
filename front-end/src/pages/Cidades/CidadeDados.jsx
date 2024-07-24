import React from 'react'
import { useParams } from 'react-router-dom';
import FormCidade from './components/FormCidades/FormCidade';

const CidadeDados = () => {
  const { id , detalhe } = useParams();
  console.log(detalhe);
  return (
    <>
        <div className='Dashboard'>
          <h1>{detalhe === 'adicionar' ? 'Adicionar Cidade' : 'Editar Cidade'}</h1>
          <FormCidade id={id} detalhe={detalhe}></FormCidade>
        </div>
    </>
  )
}

export default CidadeDados;