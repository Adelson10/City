import React from 'react';
import './Button.css'

function Button({Cor, children}) {

  return (
    <button className={`Botao ${Cor}`}>
      {children}
    </button>
  )
}

export default Button;
