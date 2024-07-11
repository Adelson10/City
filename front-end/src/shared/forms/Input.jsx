import React from 'react'
import './Input.css';

const Input = ({type, id , name, imagem, children, Cor , setChange, ...props}) => {
  return (
    <div className='Input'>
        <img fill="red" className='form__Imagem' src={imagem}/>
        <input className={`form__Input ${Cor}-select`} onChange={setChange} type={type} name={name} id={id} placeholder=' ' {...props} autoComplete='off'/>
        <label className={`form__Label ${Cor}-select`} htmlFor={id}>{children}</label>
  </div>
  )
}

export default Input;