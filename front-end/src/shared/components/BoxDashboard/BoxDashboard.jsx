import React from 'react';
import './BoxDashboard.css'

const BoxDashboard = ({nome,total,icon}) => {
  return (
    <div className='Box_Dash'>
        <div className='title'>
            <h1>{nome}</h1>
            <strong>{total}</strong>
        </div>
        <div className='IconDash'>{icon}</div>
    </div>
  )
}

export default BoxDashboard;