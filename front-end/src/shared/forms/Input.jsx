import React from 'react'
import './Input.css';

const Input = ({type, id , name, imagem, children, Cor }) => {
  return (
    <div className='Input'>
        <img fill="red" className='form__Imagem' src={imagem}/>
        <input className={`form__Input ${Cor}-select`} type={type} name={name} id={id} placeholder=' ' autoComplete='off'/>
        <label className={`form__Label ${Cor}-select`} htmlFor={id}>{children}</label>
  </div>
  )
}

export default Input;