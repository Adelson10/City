import React from 'react';
import './Botao.css';
import { useNavigate } from 'react-router-dom';

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
    <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={`Botao ${select ? 'Select' : ''}`}>{icon.type({...icon.props, cor: select && !Icon ? 'rgba(0,98,15,1)' : Icon ? 'white' : '#828282' })}{children}</button>
  )
}

export default Botao;