import React from 'react'
import './Input.css';
import 'boxicons';

const Input = ({type, id , name, icon, children, error, value, onChange, onBlur , list}) => {
    return (
    <div>
      <div className='Input'>
          <box-icon color={ !value && !error ? '#6b6b6bb4' : error ? 'red' : '#00a519' } name={icon.name} type='solid' size={ icon.size ? icon.size : '1rem'} style={icon.class}></box-icon>
          <input 
          className={`form__Input ${error ? 'Error' : 'Verde-select'}`} 
          type={type}
          id={id}
          placeholder=' '
          autoComplete='off'
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          list={list}
          required/>
          <label className={`form__Label ${error ? 'Error-select' : ''}`} htmlFor={id}>{children}</label>
      </div>
          {list && 
          <datalist id={list}>
          <option>teste1</option>
          <option>teste2</option>
          <option>teste3</option>
          <option>teste4</option>
        </datalist>}
      {error && <p className='Mensagem'>{error}</p>}
    </div>
  )
}

export default Input;