import React from 'react';
import './Botao.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons';

const BotaoIcon = ({ icon , select, handleClick}) => {
  const [Icon,setIcon] = React.useState(false);
  useNavigate();

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button id='Botao' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={'Botao__Icon'}><box-icon color={ !Icon ?  icon.cor[1] : icon.cor[0] } name={icon.name} type='solid' size={icon.size} style={icon.class}></box-icon></button>
  )
}

export default BotaoIcon;