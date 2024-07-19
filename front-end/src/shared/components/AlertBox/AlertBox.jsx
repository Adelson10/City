import React from 'react'
import Button from '../../forms/Button'
import './AlertBox.css';

const AlertBox = ({handleYes, handleNo}) => {
  return (
    <section className='Box'>
        <p>Você tem certeza?</p>
        <div className='botoes__box'>
            <Button onClick={handleYes}>Sim</Button>
            <Button onClick={handleNo}>Não</Button>
        </div>
    </section>
  )
}

export default AlertBox
