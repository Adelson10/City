import React from 'react';
import Button from '../../shared/forms/Button';
import Filter from './components/filter/Filter';

import './Pessoas.css';

const Pessoas = () => {
  return (
    <div className='Dashboard'>
    <h1>DASHBOARD</h1>
        <div className='Container__Filtro'>
          <Button width={10}>ADICIONAR</Button>
          <Filter />
        </div>
  </div>
)
}

export default Pessoas;