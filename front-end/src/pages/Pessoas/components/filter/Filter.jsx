import React from 'react';
import './Filter.css';

const filter = ({placeholder}) => {
  return (
    <div className='Input__Box'>
      <div className='Filter__Icon'></div>
      <div className='Input__Label'>
        <input placeholder={placeholder} className='Input__Filter' type="search" />
      </div>
    </div>
  )
}

export default filter;