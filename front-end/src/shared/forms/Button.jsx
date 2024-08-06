import React from 'react';
import './Button.css'

function Button({children, width = 'fit-content', fontWeight = '', ...props}) {

  return (
    <button {...props} className='Botao__Input' style={{width:  width !== 0 ? `${width}rem` : '100%' , fontWeight: fontWeight !== '' ? fontWeight : 'normal' }}>
      {children}
    </button>
  )
}

export default Button;
