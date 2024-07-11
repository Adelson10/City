import React from 'react'
import './Input.css';

const Input = ({type, id , name, icon, children, error, value, onChange, onBlur }) => {
  return (
    <div>
    <div className='Input'>
        {icon.type({...icon.props, cor: !value && !error ? '#6b6b6bb4' : error ? 'red' : 'green'})}
        <input 
        className={`form__Input ${error ? 'Error' : 'Verde-select'}`} 
        type={type === 'password' ? 'password' : 'text'}
        name={name}
        id={id}
        placeholder=' '
        autoComplete='off'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required/>
        <label className={`form__Label ${error ? 'Error-select' : ''}`} htmlFor={id}>{children}</label>
    </div>
    {error && <p className='Mensagem'>{error}</p>}
    </div>
  )
}

export default Input;