import React from 'react';

const types = {
    email: {
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email em formato inválido.',
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'A senha precisa ter no mínimo 8 dígitos, incluindo uma letra maiúscula, uma letra minúscula, números e um caractere especial.'
    },
}

const UseValidation = (type) => {
    const [error, setError] = React.useState(null);
    const [value, setValue] = React.useState('');

    function onChange({target}) {
        if (error) validation(target.value);
        setValue(target.value);
    }

    function ValidationCep(value) {
        let valueResult = value;
        valueResult = value.replace(/\D/g,'');
        valueResult = value.replace(/(\d{5})(\d)/,'$1-$2');
        return setValue(valueResult);
    }

    function validation(value) {
        if(type===false) return true;
        if(value.length===0) {
          setError('Campo obrigatorio.');
          return false;
        }else if( types[type] && !types[type].regex.test(value)) {
          setError(types[type].message);
          return false;
        } else {
          setError(null);
          return true;
        }
    }

  return {
    error,
    value,
    setValue,
    onChange,
    onBlur: () => validation(value),
  }
}

export default UseValidation;