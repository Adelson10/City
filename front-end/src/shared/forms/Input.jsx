import React from 'react'
import './Input.css';

const Input = ({type, id , name, imagem, children, Cor, error, value, onChange, onBlur }) => {
  
  return (
    <div>
    <div className='Input'>
        <img className='form__Imagem' src={imagem}/>
        <input 
        className={`form__Input Verde-select ${error ? 'Error' : ''}`} 
        type={type === 'password' ? 'password' : 'text'}
        name={name}
        id={id}
        placeholder=' '
        autoComplete='off'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required/>
        <label className={`form__Label Verde-select ${error ? 'Error-select' : ''}`} htmlFor={id}>{children}</label>
    </div>
    {error && <p className='Mensagem'>{error}</p>}
    </div>
  )
}

export default Input;