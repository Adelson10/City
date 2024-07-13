import React from 'react';
import './Botao.css';

const Botao = ({children, icon, id}) => {
  return (
    <button id={id} className='Botao'>{icon}{children}</button>
  )
}

export default Botao;