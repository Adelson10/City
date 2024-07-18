import React from 'react';
import './Botao.css';
import 'boxicons';

const BotaoIcon = ({ icon , handleClick, id}) => {
  const [Icon,setIcon] = React.useState(false);

  function handleMouseEnter() {
    setIcon(true);
  }

  function handleMouseOver() {
    setIcon(false);
  }

  return (
    <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver} className={'Botao__Icon'}><box-icon id={id} color={ !Icon ?  icon.cor[1] : icon.cor[0] } name={icon.name} type='solid' size={icon.size} style={icon.class}></box-icon></button>
  )
}

export default BotaoIcon;