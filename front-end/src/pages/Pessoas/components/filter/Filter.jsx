import React from 'react';
import './Filter.css';

const filter = ({placeholder,change,handleChange}) => {
  return (
    <div className='Input__Box'>
      <div className='Filter__Icon'></div>
      <div className='Input__Label'>
        <input onChange={handleChange} value={change} placeholder={placeholder} className='Input__Filter' type="search" />
      </div>
    </div>
  )
}

export default filter;