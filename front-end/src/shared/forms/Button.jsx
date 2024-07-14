import React from 'react';
import './Button.css'

function Button({children, width = 0, fontWeight = ''}) {

  return (
    <button className='Botao__Input Verde' style={{width:  width !== 0 ? `${width}rem` : '100%' , fontWeight: fontWeight !== '' ? fontWeight : 'normal' }}>
      {children}
    </button>
  )
}

export default Button;
