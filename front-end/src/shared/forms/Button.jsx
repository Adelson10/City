import React from 'react';
import './Button.css'

function Button({children}) {

  return (
    <button className={`Botao Verde`}>
      {children}
    </button>
  )
}

export default Button;
