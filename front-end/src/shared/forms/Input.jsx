import React from 'react'
import './Input.css';

const Input = ({type, id , icon, children, error, value, onChange, onBlur , list, setValue, cor, ...props}) => {

    const [listFocus, setListFocus] = React.useState(false);
    
    if(list) {
      return (
        <div>
          <div className='Input'>
              {icon}
              <input 
              className={`form__Input ${error ? 'Error' : ''}`} 
              type={type}
              id={id}
              placeholder=' '
              autoComplete='off'
              value={value}
              onChange={onChange}
              onFocus={() => setListFocus((listFocus) => listFocus = true)}
              required/>
              <label className={`form__Label ${error ? 'Error-select' : ''}`} htmlFor={id}>{children}</label>
              { listFocus && list.length>0 &&
                <ul className='Lista__Pessoas'>
                  {list.map(({nome}) => {
                    return <li key={nome} onClick={() => {setValue(nome); setListFocus((listFocus) => listFocus = false);}}>{nome}</li>
                  })}
                </ul>
              }
          </div>
          {error && <p className='Mensagem'>{error}</p>}
      </div>
      )
    }
    else return (
    <div>
      <div className='Input'>
          {icon}
          <input 
          className={`form__Input ${error ? 'Error' : 'Verde-select'}`} 
          type={type}
          id={id}
          placeholder=' '
          autoComplete='off'
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
          required/>
          <label className={`form__Label ${error ? 'Error-select' : ''}`} htmlFor={id}>{children}</label>
      </div>
      {error && <p className='Mensagem'>{error}</p>}
    </div>
  )
}

export default Input;