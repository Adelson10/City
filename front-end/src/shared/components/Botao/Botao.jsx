import React from 'react';
import './Botao.css';

const Botao = ({ children, icon }) => {
  const [Icon,setIcon] = React.useState(false);

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className='Botao'>{icon.type({...icon.props, cor: Icon ? 'white' : 'rgba(0,98,15,1)' })}{children}</button>
  )
}

export default Botao;