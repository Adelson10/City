import React from 'react';
import './Botao.css';

const BotaoIcon = ({ icon , handleClick, id}) => {
  const [Icon,setIcon] = React.useState(false);

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={'Botao__Icon'}></button>
  )
}

export default BotaoIcon;