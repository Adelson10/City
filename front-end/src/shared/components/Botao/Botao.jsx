import React from 'react';
import './Botao.css';
import 'boxicons';

const Botao = ({ children, icon , select, handleClick}) => {
  const [Icon,setIcon] = React.useState(false);

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button id='Botao' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={`Botao ${select ? 'Select' : ''}`}><box-icon color={ select && !Icon ?  icon.cor[0] : !Icon ? icon.cor[1] : 'white' } name={icon.name} type='solid' size={icon.size} style={icon.class}></box-icon>{children}</button>
  )
}

export default Botao;