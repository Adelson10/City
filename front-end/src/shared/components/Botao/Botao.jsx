import React from 'react';
import './Botao.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons';

const Botao = ({ children, icon , select, handleClick}) => {
  const [Icon,setIcon] = React.useState(false);
  useNavigate();

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={`Botao ${select ? 'Select' : ''}`}><box-icon color={ !Icon ? icon.cor[0] : icon.cor[1] } name={icon.name} type='solid' size={icon.size} style={icon.class}></box-icon>{children}</button>
  )
}

export default Botao;