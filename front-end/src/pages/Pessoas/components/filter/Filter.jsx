import React from 'react';
import './Filter.css';

const filter = ({placeholder}) => {
  return (
    <div className='Input__Box'>
      <div className='Filter__Icon'></div>
      <input placeholder={placeholder} className='Input__Filter' type="search" />
    </div>
  )
}

export default filter;