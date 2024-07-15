import React, { useEffect } from 'react';
import './Botao.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons';
import useDarkMode from '../../Hooks/useDarkMode';

const Botao = ({ children, icon , select, handleClick}) => {
  const [Icon,setIcon] = React.useState(false);
  const {styles} = useDarkMode();
  useNavigate();

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button id='Botao' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={`Botao ${select ? 'Select' : ''}`}><box-icon color={ select && !Icon ?  icon.cor : !Icon ? styles.color : 'white' } name={icon.name} type='solid' size={icon.size} style={icon.class}></box-icon>{children}</button>
  )
}

export default Botao;