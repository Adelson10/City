import React from 'react'
import './Input.css';

const Input = ({type, id , name, children }) => {
  return (
    <div className='Input'>
        <input type={type} name={name} id={id} />
        <label htmlFor={id}>{children}</label>
  </div>
  )
}

export default Input;