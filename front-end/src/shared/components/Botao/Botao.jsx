import React from 'react';
import './Botao.css';

const Botao = ({ children, icon , select, handleClick}) => {
  const [Icon,setIcon] = React.useState(false);

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button id='Botao' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={`Botao ${select ? 'Select' : ''}`}>{children}</button>
  )
}

export default Botao;