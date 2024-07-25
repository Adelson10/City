import React from 'react'
import { useParams } from 'react-router-dom';
import FormCidade from './components/FormCidades/FormCidade';

const CidadeDados = () => {
  const { id , detalhe } = useParams();
  document.title = detalhe;
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